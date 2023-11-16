const jwt = require("jsonwebtoken");

module.exports = {
  ValidateRegis: async (req, res, next) => {
    console.log(req.body.password);
    if (
      req.body.password.length >= 8 &&
      req.body.password === req.body.confirmPassword
    ) {
      console.log("REQ BODY LENGTH LEBIH DARI 8");
      next();
    } else {
      console.log("GAGAL");
      return res.status(400).send({
        succes: false,
        message:
          "Password must be at least 8 characters, equal to current password",
      });
    }
  },
  ValidateToken: async (req, res, next) => {
    console.log(req.token);
    if (req.token) {
      try {
        if (!req.token) {
          return res.status(400).send({
            succes: false,
            message: "You not have a token",
          });
        } else {
          const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
          if (!verifyData) {
            return res.status(401).send({
              succes: false,
              message: "Unautohrized request",
            });
          } else {
            req.userData = verifyData;
            next();
          }
        }
      } catch (error) {
        console.log(error);
        return res.status(400).send("Invalid token");
      }
    } else {
      return res.status(400).send({
        succes: false,
        message: "You not have a token",
      });
    }
  },
};
