const db = require("../models");
const { events, eventsImages, tickets, eventsPromotions } = require("../models");

module.exports = {
    getAllPromos : async (req, res, next) => {
        try {
            const result = await eventsPromotions.findAll({
                // where : {
                //     promotorId : promotorId,
                // },
                include : [
                    {
                        model : events,
                        attributes : ["id", "name"],
                    },
                ]
            });
            return res.status(200).send(result);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on getAllPromos",
                error
            });
        };
    },

    getPromoDetails : async (req, res, next) => {
        try {
            const result = await eventsPromotions.findOne({
                where : {
                    id : req.params.id,
                },
                include : [
                    {
                        model : events,
                        attributes : ["id", "name"],
                        // required : true
                    },
                ]
            });

            return res.status(200).send(result);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on getPromoDetails",
                error
            });
        };
    },

    createPromo : async (req, res, next) => {
        // # transaction - savepoint
        const t = await db.sequelize.transaction();
        try {
            // body : eventId, voucherName, voucherValue, useLimit, needPoint
            const eventId = req.params.id;
            console.log("req body -----> ", req.body);
            
            const uploadData = {
                eventId : eventId,
                voucherName : req.body.voucherName,
                voucherValue : req.body.voucherValue,
                useLimit : req.body.useLimit,
                needPoint : req.body.needPoint
            };

            // CREATE EVENT PROMO
            const result = await eventsPromotions.create(uploadData, 
                { transaction : t, } // # transaction - define
            );

            await t.commit(); // # transaction - commit

            return res.status(201).send({
                success : true,
                message : "Event Promo Created",
            });
            
        }
        catch (error) {
            await t.rollback(); // # transaction - rollback on error
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on createPromo",
                error
            });
        };
    },

    updatePromo : async (req, res, next) => {
        const t = await db.sequelize.transaction(); // # transaction - savepoint
        try {
            const promoId = req.params.id;
            console.log("req body => ", req.body);

            // UPDATE TICKET
            const result = await eventsPromotions.update(req.body, 
                {
                    where : { id : promoId }
                },
                { transaction : t, } // # transaction - define
            );

            await t.commit(); // # transaction - commit
            return res.status(200).send({
                success : true,
                message : "Event Promo Updated Successfully!!!",
            });
        }
        catch (error) {
            await t.rollback(); // # transaction - rollback on error
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on updatePromo",
                error
            });
        };
    },

    deletePromo : async (req, res, next) => {
        const t = await db.sequelize.transaction(); // # transaction - savepoint
        try {
            const promoId = req.params.id;
            console.log("req body => ", req.body);

            // DELETE TICKET
            const result = await eventsPromotions.destroy(
                {
                    where : { id : promoId }
                },
                { transaction : t, } // # transaction - define
            );

            await t.commit(); // # transaction - commit
            return res.status(200).send({
                success : true,
                message : "Event Promo Deleted Successfully!!!",
            });
        }
        catch (error) {
            await t.rollback(); // # transaction - rollback on error
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on deletePromo",
                error
            });
        };
    },
};