// ! SETUP
const router = require("express").Router();

const { getAllPromos, getPromoDetails, createPromo, updatePromo, deletePromo } = require("../controllers/eventpromos");
// ! IMPORTS
const { eventPromoController } = require("../controllers/index");

// ! ROUTERS
router.get("/event-promos", getAllPromos);
router.get("/event-promos/:id", getPromoDetails);
router.post("/event-promos/:id", createPromo);
router.patch("/event-promos/:id", updatePromo);
router.delete("/event-promos/:id", deletePromo);

// ! EXPORT
module.exports = router;