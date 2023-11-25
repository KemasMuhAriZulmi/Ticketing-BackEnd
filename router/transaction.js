const router = require("express").Router();
const { transactionController } = require("../controller");
const { ValidateToken } = require("../middleware/validation");

router.get("/", transactionController.getData);
router.post("/create", ValidateToken, transactionController.create);
router.get("/detail?", ValidateToken, transactionController.detail);
router.patch("/checkout/:id", ValidateToken, transactionController.checkout);
router.get("/mybooks", ValidateToken, transactionController.mybooks);

module.exports = router;