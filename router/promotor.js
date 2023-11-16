const router = require("express").Router();
const { promotorController } = require("../controller");
const { ValidateToken } = require("../middleware/validation");

router.get("/", promotorController.getData);
router.post("/register", promotorController.register);
router.post("/login", promotorController.login);
router.get("/keeplogin", ValidateToken, promotorController.keeplogin);

module.exports = router;
