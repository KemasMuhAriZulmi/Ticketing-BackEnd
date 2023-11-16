const router = require("express").Router();
const { userController } = require("../controller");
const { ValidateToken, ValidateRegis } = require("../middleware/validation");

router.get("/", userController.getData);
router.post("/register", ValidateRegis, userController.register);
router.post("/login", userController.login);
router.post("/keplogin", ValidateToken, userController.keeplogin);
router.get("/detail", ValidateToken, userController.detail);
router.post("/update", ValidateToken, userController.update);

module.exports = router;
