// ! SETUP
const router = require("express").Router();

// ! IMPORTS
const {
  getAllPromos,
  getPromoDetails,
  createPromo,
  updatePromo,
  deletePromo,
} = require("../controllers/eventpromos");

// ! ROUTERS
router.get("/event-promos", getAllPromos);
router.get("/event-promos/:id", getPromoDetails);
router.post("/event-promos", createPromo);
router.patch("/event-promos/:id", updatePromo);
router.delete("/event-promos/:id", deletePromo);

// ! EXPORT
module.exports = router;
