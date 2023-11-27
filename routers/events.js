// ! SETUP
const router = require("express").Router();

// ! IMPORTS
const { eventController } = require("../controllers/index");
const { uploader } = require("../helper/uploader");

// ! ROUTERS
router.get("/events", eventController.getAllEvents);
router.get("/events/:id", eventController.getEventDetail);
router.post("/events", uploader("/events").single("fileupload"), eventController.createEvent);
router.patch("/events/:id", uploader("/events").single("fileupload"), eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);


// ! EXPORT
module.exports = router;