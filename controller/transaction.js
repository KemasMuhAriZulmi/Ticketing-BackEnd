const {
  transactions,
  tickets,
  buyers,
  items,
  eventsPromotions,
} = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getData: async (req, res, next) => {
    res.status(200).send("HELLO");
  },
  create: async (req, res, next) => {
    try {
      const total = req.body.totalItems;

      console.log(
        req.userData.id,
        req.body.payment,
        req.body.eventid,
        `INV-${new Date().getTime()}${Math.floor(Math.random() * 1000)}`
      );

      const newTransaction = await transactions.create({
        userid: req.userData.id,
        invoice: `INV-${new Date().getTime()}${Math.floor(
          Math.random() * 1000
        )}`,
        payment: req.body.payment,
        bookingdate: new Date(),
        promocode: req.body.promocode || null,
        eventid: req.body.eventid,
        fee: 1500,
        ispaid: false,
      });

      console.log(!newTransaction.promoid);

      if (!newTransaction.promoid) {
        const isPromo = await eventsPromotions.findOne({
          where: {
            voucherName: newTransaction.promocode,
          },
        });

        await eventsPromotions.update(
          {
            useLimit: isPromo - 1,
          },
          {
            where: {
              voucherName: newTransaction.promocode,
            },
          }
        );
      }

      const transactionId = newTransaction.id;
      console.log(transactionId);

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

      const itemPromises = total.map(async (val, idx) => {
        const isTicket = await tickets.findOne({
          where: {
            id: val.ticketid,
            quota: {
              [Op.and]: [{ [Op.gt]: 0 }, { [Op.gte]: val.quantity }],
            },
          },
        });

        if (!isTicket) {
          console.log("MASUK ELSE");
          throw new Error(
            `Ticket with id ${val.ticketid} was not found or maybe out of stock`
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
          transactionId: transactionId,
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

      res.status(200).send({
        success: true,
        message: "Transaction created successfully",
        transaction: newTransaction,
        items: createdItems,
        buyerData: buyerData,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.rc || 500).send(error);
    }
  },
};
