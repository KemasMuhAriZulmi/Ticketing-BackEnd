const {
  transactions,
  tickets,
  buyers,
  items,
  eventsPromotions,
  events,
} = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getData: async (req, res, next) => {
    res.status(200).send("HELLO");
  },
  create: async (req, res, next) => {
    try {
      const total = req.body.totalItems;

      const invoiceNumber = `INV-${new Date().getTime()}${Math.floor(
        Math.random() * 1000
      )}`;

      const newTransaction = await transactions.create({
        userid: req.userData.id,
        invoice: invoiceNumber,
        payment: req.body.payment,
        bookingdate: new Date(),
        promocode: req.body.promocode || null,
        eventid: req.body.eventid,
        fee: 1500,
        ispaid: false,
      });

      if (newTransaction.promocode) {
        const isPromo = await eventsPromotions.findOne({
          where: {
            voucherName: newTransaction.promocode,
          },
        });

        if (isPromo) {
          await eventsPromotions.update(
            {
              useLimit: isPromo.useLimit - 1,
            },
            {
              where: {
                voucherName: newTransaction.promocode,
              },
            }
          );
        }
      }
      const transactionId = newTransaction.id;

      const buyerData = await buyers.create({
        transactionid: transactionId,
        name: req.body.name,
        phone: req.body.phone,
        country: req.body.country,
        province: req.body.province,
        city: req.body.city,
        email: req.body.email,
        poscode: req.body.poscode,
        address: req.body.address,
      });

      const itemPromises = total.map(async (val) => {
        const isTicket = await tickets.findOne({
          where: {
            id: val.ticketid,
            // quota: {
            //   [Op.and]: [{ [Op.gt]: 0 }],
            // },
          },
        });

        console.log("SAMPEK SINI");
        if (!isTicket) {
          throw new Error(
            `Ticket with id ${val.ticketid} was not found or may be out of stock`
          );
        }

        await tickets.update(
          {
            quota: isTicket.quota - val.quantity,
          },
          {
            where: {
              id: val.ticketid,
            },
          }
        );

        const itemSubtotal = isTicket.price * val.quantity;
        const itemTotalWithFee = itemSubtotal + newTransaction.fee;

        return items.create({
          transactionid: transactionId,
          ticketid: val.ticketid,
          quantity: val.quantity,
          price: isTicket.price,
          total: itemTotalWithFee,
        });
      });

      const createdItems = await Promise.all(itemPromises);

      const calculatedTotal = createdItems.reduce(
        (acc, item) => acc + item.total,
        0
      );

      await newTransaction.update({ subtotal: calculatedTotal });

      const expirationTime = 60 * 60 * 1000;
      const expirationDate = new Date(
        newTransaction.bookingdate.getTime() + expirationTime
      );

      setTimeout(async () => {
        try {
          const activeTransaction = await transactions.findOne({
            where: {
              id: transactionId,
              ispaid: false,
              createdAt: {
                [Op.lte]: expirationDate,
              },
            },
          });

          if (activeTransaction) {
            // Soft deleting the expired transaction
            await transactions.destroy({
              where: {
                id: transactionId,
              },
            });

            // Deleting buyer data associated with the transaction
            await buyers.destroy({
              where: {
                transactionid: transactionId,
              },
            });

            // Retrieving items in the transaction
            const itemsInTransaction = await items.findAll({
              where: {
                transactionid: transactionId,
              },
            });

            // Restoring ticket quotas
            const restoreQuotaPromises = itemsInTransaction.map(
              async (item) => {
                const ticket = await tickets.findByPk(item.ticketid);

                if (ticket) {
                  await tickets.update(
                    {
                      quota: ticket.quota + item.quantity,
                    },
                    {
                      where: {
                        id: item.ticketid,
                      },
                    }
                  );
                }
              }
            );

            await Promise.all(restoreQuotaPromises);

            console.log(
              `Transaction ${transactionId} has expired and was soft-deleted.`
            );
          }
        } catch (error) {
          console.error("Error while handling transaction expiration:", error);
        }
      }, expirationTime);

      // Sending success response
      res.status(200).send({
        success: true,
        message: "Transaction created successfully",
        transaction: newTransaction,
        items: createdItems,
        buyerData: buyerData,
      });
    } catch (error) {
      console.error(error);
      res.status(error.rc || 500).send(error);
    }
  },

  checkout: async (req, res, next) => {
    console.log("In");
    try {
      const transaction = await transactions.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      console.log(transaction);
      if (!transaction) {
        return res
          .status(404)
          .send({ success: false, message: "Transaction not found" });
      }

      const createdAt = new Date(transaction.createdAt);
      const currentTime = new Date();

      const timeDifferenceInMilliseconds = currentTime - createdAt;

      const timeDifferenceInHours =
        timeDifferenceInMilliseconds / (1000 * 60 * 60);

      if (timeDifferenceInHours < 1) {
        const updateResult = await transactions.update(
          { ispaid: true },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        if (updateResult > 0) {
          res.status(200).send({ success: true, message: "Success Checkout" });
        } else {
          res
            .status(404)
            .send({ success: false, message: "Checkout not found" });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Get Data Failed",
        error: error.message || "Internal Server Error",
      });
    }
  },
  detail: async (req, res, next) => {
    try {
      const query = req.query;
      const excludeAttributes = ["deletedAt", "buyerid", "buyerId"];

      if (query.id && !query.sort && !query.order) {
        const result = await transactions.findOne({
          where: {
            id: query.id,
          },
          attributes: {
            exclude: excludeAttributes,
          },
          include: [
            {
              model: items,
              attributes: ["ticketid", "quantity", "price", "total"],
            },
            {
              model: buyers,
              attributes: [
                "name",
                "phone",
                "country",
                "province",
                "city",
                "email",
                "poscode",
                "address",
              ],
            },
          ],
        });

        if (!result) {
          throw new Error("Transaction not found");
        }

        return res.status(200).send({
          success: true,
          message: "Get Data transaction Successfully",
          data: result,
        });
      } else if (query.sort && query.order) {
        const result = await transactions.findAll({
          attributes: {
            exclude: excludeAttributes,
          },
          where: {
            userid: req.userData.id,
          },
          order: [[query.sort, query.order]],
        });

        if (!result || result.length === 0) {
          throw new Error("No transactions found with the given criteria");
        }

        return res.status(200).send({
          success: true,
          message: "Get Data transaction Successfully",
          data: result,
        });
      } else {
        throw new Error("Invalid query parameters");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Get Data Failed",
        error: error.message || "Internal Server Error",
      });
    }
  },

  mybooks: async (req, res, next) => {
    try {
      const excludeAttributes = ["deletedAt", "buyerid", "buyerId"];
      const result = await transactions.findAll({
        where: {
          userid: req.userData.id,
        },
        attributes: {
          exclude: excludeAttributes,
        },
      });

      if (!result) {
        throw new Error("Transaction not found");
      }

      return res.status(200).send({
        success: true,
        message: "Get Data transaction Successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Get Data Failed",
        error: error.message || "Internal Server Error",
      });
    }
  },
  checkEvent: async (req, res, next) => {
    try {
      const result = await events.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ Success: false, message: "Not Found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Get Data Failed",
        error: error.message || "Internal Server Error",
      });
    }
  },
  getEvent: async (req, res, next) => {
    try {
      const result = await events.findAll({
        raw: true,
      });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Get Data Failed",
        error: error.message || "Internal Server Error",
      });
    }
  },
  getTicket: async (req, res, next) => {
    console.log(req.query);
    try {
      const result = await tickets.findAll({
        where: {
          eventId: req.query.eventId,
        },
        raw: true,
      });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Get Data Failed",
        error: error.message || "Internal Server Error",
      });
    }
  },
};
