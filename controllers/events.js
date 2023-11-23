// import models from models
const db = require("../models");
const { events, eventsImages, tickets } = require("../models");
const bcrypt = require("bcrypt");

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

            // # transaction - commit
            await t.commit();

            return res.status(201).send({
                success : true,
                message : "Event Created",
                "Created Event" : uploadDataEvent,
                "Created Image" : uploadDataEventImage,
            });
            
        }
        catch (error) {
            // # transaction - rollback on error
            await t.rollback();
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "error on createEvent",
                error
            });
        };
    },

    updateEvent : async (req, res, next) => {
        // # transaction - savepoint
        const t = await db.sequelize.transaction();
        try {

            // { transaction : t, } // # transaction - define
            
            // # transaction - commit
            await t.commit();
            // RETURN
            return res.status(200).send("updateevents");
        }
        catch (error) {
            // # transaction - rollback on error
            await t.rollback();
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

            // { transaction : t, } // # transaction - define
            
            // # transaction - commit
            await t.commit();
            // RETURN
            return res.status(200).send("deleteevents");
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
}