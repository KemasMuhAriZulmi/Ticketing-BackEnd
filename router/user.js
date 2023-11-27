const router = require("express").Router();
const { userController } = require("../controller");
const { ValidateToken, ValidateRegis } = require("../middleware/validation");
const { uploader } = require("../helper/uploader");

router.get("/", userController.getData);
router.post("/register", ValidateRegis, userController.register);
router.post("/login", userController.login);
router.post("/keplogin", ValidateToken, userController.keeplogin);
router.get("/detail", ValidateToken, userController.detail);
router.post(
  "/update",
  ValidateToken,
  uploader("/profileimage").single("fileupload"),
  userController.update
);
router.post("/sentemail", userController.sentemail);
router.post("/updatepass", userController.forgotPass);
router.post("/updatepassword", ValidateToken, userController.changePass);
router.get("/checkrole", ValidateToken, userController.checkrole);

module.exports = router;
