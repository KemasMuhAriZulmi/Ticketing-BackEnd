const router = require("express").Router();
const { refferalsController } = require("../controller");
const { ValidateToken } = require("../middleware/validation");

router.get("/", ValidateToken, refferalsController.getData);

module.exports = router;
