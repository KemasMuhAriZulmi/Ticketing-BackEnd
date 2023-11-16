const { refferals } = require("../models");

module.exports = {
  getData: async (req, res, next) => {
    try {
      const result = await refferals.findOne({
        where: {
          userid: req.userData.id,
        },
        raw: true,
      });
      return res.status(200).send({
        succes: true,
        message: "Get Data Refferal Successfully",
        data: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "get Data Failed",
        error: error,
      });
    }
  },
};
