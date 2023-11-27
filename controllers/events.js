const db = require("../models");
const { events, eventsImages, tickets } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ! Kurang : where promotorId = logged in promotor

module.exports = {
    getAllEvents : async (req, res, next) => {
        try {
            const result = await events.findAll({
                //  ! Not Yet
                // where : {
                //     promotorId : promotorId,
                // },
                include : [
                    {
                        model : eventsImages,
                        attributes : ["eventId", "eventImage"],
                    },
                    {
                        model : tickets,
                        attributes : ["ticketType", "price", "quota"],
                    }
                ]
            });
            return res.status(200).send(result);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on getAllEvents",
                error
            });
        };
    },
    
    getEventDetail : async (req, res, next) => {
        try {
            const result = await events.findOne({
                where : {
                    id : req.params.id,
                },
                include : [
                    {
                        model : eventsImages,
                        attributes : ["eventId", "eventImage"],
                        // required : true
                    },
                    {
                        model : tickets,
                        attributes : ["ticketType", "price", "quota"],
                    }
                ]
            });

            return res.status(200).send(result);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on getEventDetail",
                error
            });
        };
    },

    createEvent : async (req, res, next) => {
        // # transaction - savepoint
        const t = await db.sequelize.transaction();
        try {
            // body : promotorId, name, description, startDate, endDate, location, category, createdAt, updatedAt
            // Create Event
            console.log("req body -----> ", req.body);
            console.log("req file -----> ", req.file);

            const uploadDataEvent = {
                promotorId : req.body.promotorId,
                name : req.body.name,
                description : req.body.description,
                startdate : req.body.startdate,
                enddate : req.body.enddate,
                location : req.body.location,
                category : req.body.category,
            };
            // CREATE EVENT
            const result = await events.create(uploadDataEvent, 
                { transaction : t, } // # transaction - define
            );

            // CREATE EVENT IMAGE
            const uploadDataEventImage = {
                eventId : result.dataValues.id,
                eventImage : req.file.path
            };
            await eventsImages.create(uploadDataEventImage, 
                { transaction : t, } // # transaction - define
            );

            await t.commit(); // # transaction - commit

            return res.status(201).send({
                success : true,
                message : "Event Created",
                "Created Event" : uploadDataEvent,
                "Created Image" : uploadDataEventImage,
            });
            
        }
        catch (error) {
            await t.rollback(); // # transaction - rollback on error
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on createEvent",
                error
            });
        };
    },

    updateEvent : async (req, res, next) => {
        const t = await db.sequelize.transaction(); // # transaction - savepoint
        try {
            console.log("req param => ", req.params);
            const isExist = await events.findOne({
                where : {
                    id : req.params.id,
                }
            });

            if (!isExist) {
                await t.commit();
                return res.status(404).send({
                    success : false,
                    message : "Event based on current 'ID' not exist",
                });
            };

            // UPDATE EVENT
            if (req.body) {
                await events.update( req.body, 
                    {
                        where : { id : req.params.id }
                    },
                    { transaction : t, } // # transaction - define
                );
            };

            // UPDATE EVENT IMAGE
            if (req.file) {
                await eventsImages.update( req.file.path, 
                    {
                        where : { eventId : isExist.dataValues.id }
                    },
                    { transaction : t, } // # transaction - define
                );
            };

            await t.commit(); // # transaction - commit
            return res.status(200).send({
                success : true,
                message : "Event Updated Successfully!!!",
            });
        }
        catch (error) {
            await t.rollback(); // # transaction - rollback on error
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on updateEvent",
                error
            });
        };
    },

    deleteEvent : async (req, res, next) => {
        const t = await db.sequelize.transaction();
        try {
            console.log("req params id => ", req.params);
            const result = await events.destroy(
                {
                    where : { id : req.params.id }
                },
                { transaction : t, } // # transaction - define
            );
            
            // # transaction - commit
            await t.commit();
            // RETURN
            return res.status(200).send({
                success : true,
                message : "Data Deleted Successfully!!!",
                result : result,
            });
        }
        catch (error) {
            // # transaction - rollback on error
            await t.rollback();
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on deleteEvent",
                error
            });
        };
    },

};