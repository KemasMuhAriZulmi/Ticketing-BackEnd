const db = require("../models");
const { events, eventsImages, tickets } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    getAllTickets : async (req, res, next) => {
        try {
            const result = await tickets.findAll({
                include : [
                    {
                        model : events,
                        attributes : ["name"],
                    },
                ]
            });
            return res.status(200).send(result);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on getAllTickets",
                error
            });
        };
    },

    createTicket : async (req, res, next) => {
        const t = await db.sequelize.transaction(); // # transaction - savepoint
        try {
            const eventId = req.params.id;
            console.log("req body => ", req.body);

            const uploadDataTicket = {
                eventId : eventId,
                ticketType : req.body.ticketType,
                price : req.body.price,
                quota : req.body.quota,
            };
            // CREATE TICKET
            const result = await tickets.create(uploadDataTicket, 
                { transaction : t, } // # transaction - define
            );

            await t.commit(); // # transaction - commit
            return res.status(201).send({
                success : true,
                message : "Event Ticket Created Successfully!!!",
            });
        }
        catch (error) {
            await t.rollback(); // # transaction - rollback on error
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on create ticket",
                error
            });
        };
    },
    
    updateTicket : async (req, res, next) => {
        const t = await db.sequelize.transaction(); // # transaction - savepoint
        try {
            const ticketId = req.params.id;
            console.log("req body => ", req.body);

            // UPDATE TICKET
            const result = await tickets.update(req.body, 
                {
                    where : { id : ticketId }
                },
                { transaction : t, } // # transaction - define
            );

            await t.commit(); // # transaction - commit
            return res.status(200).send({
                success : true,
                message : "Event Ticket Updated Successfully!!!",
            });
        }
        catch (error) {
            await t.rollback(); // # transaction - rollback on error
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on update ticket",
                error
            });
        };
    },

    deleteTicket : async (req, res, next) => {
        const t = await db.sequelize.transaction(); // # transaction - savepoint
        try {
            const ticketId = req.params.id;
            console.log("req body => ", req.body);

            // DELETE TICKET
            const result = await tickets.destroy(
                {
                    where : { id : ticketId }
                },
                { transaction : t, } // # transaction - define
            );

            await t.commit(); // # transaction - commit
            return res.status(200).send({
                success : true,
                message : "Event Ticket Deleted Successfully!!!",
            });
        }
        catch (error) {
            await t.rollback(); // # transaction - rollback on error
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on delete ticket",
                error
            });
        };
    },
};