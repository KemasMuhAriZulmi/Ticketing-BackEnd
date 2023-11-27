// ! SETUP
const router = require("express").Router();

// ! IMPORTS
const { ticketController  } = require("../controllers/index");

// ! ROUTERS
router.get("/tickets", ticketController.getAllTickets);
router.post("/tickets/:id", ticketController.createTicket);
router.patch("/tickets/:id", ticketController.updateTicket);
router.delete("/tickets/:id", ticketController.deleteTicket);

// ! EXPORT
module.exports = router;