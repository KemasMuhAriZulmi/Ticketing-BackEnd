// ! SETUP
const router = require("express").Router();

// ! IMPORTS
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
} = require("../controllers/events");
const { uploader } = require("../helper/uploader");

// ! ROUTERS
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.post("/events", uploader("/events").single("fileupload"), createEvent);
router.patch(
  "/events/:id",
  uploader("events").single("fileupload"),
  updateEvent
);
router.delete("/events/:id", deleteEvent);

// ! EXPORT
module.exports = router;
