const { promotor } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
module.exports = {
  // FEAT GET DATA : GIBRAN
  getData: async (req, res, next) => {
    try {
      const result = await promotor.findAll();
      return res.status(200).send({
        succes: true,
        message: "Get Data Promotors Successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // FEAT REGISTER DATA : GIBRAN
  register: async (req, res, next) => {
    try {
      const isExist = await promotor.findOne({
        where: {
          [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
        },
      });
      if (isExist) {
        return res.status(400).send({
          succes: false,
          message: "Email or Username already exist",
        });
      }
      if (
        req.body.password.length < 8 &&
        req.body.password != req.body.confirmPassword
      ) {
        throw {
          codestatus: 400,
          succes: false,
          message:
            "Password must contain atleast 8 character and equal with Confirm Password",
        };
      }
      delete req.body.confirmPassword;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
      await promotor.create(req.body);

      return res.status(201).send({
        succes: true,
        message: "Register Successfully",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // FEAT LOGIN DATA : GIBRAN
  login: async (req, res, next) => {
    console.log("masuk");
    try {
      const result = await promotor.findOne({
        where: {
          email: req.body.email,
        },
        raw: true,
      });
      const isValid = await bcrypt.compare(req.body.password, result.password);

      if (isValid) {
        const { id, username, email, name, balance, jumlahbook } = result;
        const token = jwt.sign(
          {
            id,
          },
          process.env.SCRT_TKN,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).send({
          succes: true,
          message: "Login Successfully",
          token,
          result: {
            username,
            name,
            email,
            balance,
            jumlahbook,
          },
        });
      } else {
        return res.status(400).send({
          succes: false,
          message: "You Are Unauthicate",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // FEAT KEEP LOGIN : GIBRAN
  keeplogin: async (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.body.id,
        },
        process.env.SCRT_TKN,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send({
        succes: true,
        message: "Login Successfully",
        token,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
