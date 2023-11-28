const db = require("../models");
const { events } = require("../models/events");
const { promotors } = require("../models/promotors");
const { tickets } = require("../models/tickets");
const { eventsPromotions } = require("../models/eventspromotions");

module.exports = {
  getAllEvents: async (req, res) => {
    try {
      const allEvents = await events.findAll({
        include: [
          {
            model: promotors,
            attributes: ["id", "name", "email", "phone", "address"],
          },
          {
            model: tickets,
            attributes: ["id", "price", "description"],
          },
          {
            model: eventsPromotions,
            attributes: ["id", "discount", "promotionId"],
          },
        ],
      });
      res.status(200).json(allEvents);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getEventById: async (req, res) => {
    try {
      const event = await events.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: promotors,
            attributes: ["id", "name", "email", "phone", "address"],
          },
          {
            model: tickets,
            attributes: ["id", "price", "description"],
          },
          {
            model: eventsPromotions,
            attributes: ["id", "discount", "promotionId"],
          },
        ],
      });
      res.status(200).send(event);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  createEvent: async (req, res) => {
    try {
      const uploader = helpers.uploader("events").fields([{ name: "image" }]);
      uploader(req, res, async (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }
        const { image } = req.files;
        const imagePath = image ? "/" + image[0].path : null;
        const newEvent = await events.create({
          ...req.body,
          image: imagePath,
        });
        res.status(201).send(newEvent);
      });
      const newEvent = await events.create(req.body);
      res.status(201).send(newEvent);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  updateEvent: async (req, res) => {
    try {
      const updatedEvent = await events.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).send(updatedEvent);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const deletedEvent = await events.destroy({
        where: { id: req.params.id },
      });
      res.status(200).send(deletedEvent);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
