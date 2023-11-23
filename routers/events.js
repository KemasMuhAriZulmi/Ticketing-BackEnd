// ! SETUP
const router = require("express").Router();

// ! IMPORTS
const {
  getAllEvents,
  getEventDetail,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { uploader } = require("../helper/uploader");

// ! ROUTERS
router.get("/events", getAllEvents);
router.get("/events/:id", getEventDetail);
router.post("/events", uploader("/events").single("fileupload"), createEvent);
router.patch(
  "/events/:id",
  uploader("events").single("fileupload"),
  updateEvent
);
router.delete("/events/:id", deleteEvent);

// ! EXPORT
module.exports = router;
