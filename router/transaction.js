const router = require("express").Router();
const { transactionController } = require("../controller");
const { ValidateToken } = require("../middleware/validation");

router.get("/", transactionController.getData);
router.post("/create", ValidateToken, transactionController.create);
// router.get("/detail?", ValidateToken, transactionController.detail);

module.exports = router;
