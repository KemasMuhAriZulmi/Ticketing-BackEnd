const { users, refferals } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op, where } = require("sequelize");
const db = require("../models");
const { generateUniqueCode } = require("../helper/utils");
const transporter = require("../helper/mailer");

module.exports = {
  // FEAT GET DATA : GIBRAN
  getData: async (req, res, next) => {
    try {
      const result = await users.findAll();
      return res.status(200).send({
        succes: true,
        message: "Get Data Users Successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // FEAT REGISTER DATA : GIBRAN
  register: async (req, res, next) => {
    try {
      const isExist = await users.findOne({
        where: {
          [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
        },
      });

      if (isExist) {
        console.log("Is Exist", isExist);
        return res.status(400).send({
          success: false,
          message: "Email or Username already exists",
        });
      }

      console.log("MASUK");
      delete req.body.confirmPassword;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;

      // Case if the user doesn't enter a referral code
      if (!req.body.refferal) {
        try {
          const newUser = await users.create(req.body);
          console.log(newUser.dataValues);

          const myReferral = generateUniqueCode();
          const userReferral = await refferals.create({
            userid: newUser.dataValues.id,
            refferal: myReferral,
            reffedtimes: 0,
          });

          return res.status(201).send({
            success: true,
            message: "Register Successfully",
            resultRefferal: userReferral,
            resultUser: newUser,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).send({
            success: false,
            message: "Register Failed",
            error: error,
          });
        }
      }

      // Case if the user enters a referral code
      const reffedBy = await refferals.findOne({
        where: {
          refferal: req.body.refferal,
        },
      });

      // Case if the user enters an incorrect referral code
      if (!reffedBy) {
        return res.status(400).send({
          success: false,
          message: "Referral code not found",
        });
      }

      try {
        // Case if the user enters a correct referral code
        const createUser = await users.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          points: 10, //new user
        });

        const myReferral = generateUniqueCode();
        const userReferral = await refferals.create({
          userid: createUser.dataValues.id,
          refferal: myReferral, //new user
        });

        // Update points for existing user who referred someone
        const referringUser = await users.findOne({
          where: {
            id: reffedBy.dataValues.userid,
          },
        }); //old user

        if (referringUser) {
          const existingUserPoints = referringUser.dataValues.points;
          const updatedExistingUserPoints = existingUserPoints + 10;
          await users.update(
            {
              points: updatedExistingUserPoints,
            },
            {
              where: {
                id: referringUser.dataValues.id,
              },
            }
          );
        }

        const updatedReffedtimes = reffedBy.dataValues.reffedtimes + 1;

        await refferals.update(
          {
            reffedtimes: updatedReffedtimes,
          },
          {
            where: {
              refferal: reffedBy.dataValues.refferal,
            },
          }
        );

        return res.status(201).send({
          success: true,
          message: "Register Successfully",
          resultRefferal: userReferral,
          resultUser: createUser,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).send({
          success: false,
          message: "Register Failed",
          error: error,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Register Failed",
        error: error,
      });
    }
  },

  // FEAT LOGIN DATA : GIBRAN
  login: async (req, res, next) => {
    console.log(req.body.password);
    try {
      const result = await users.findOne({
        where: {
          [Op.or]: [{ email: req.body.email }],
        },
        raw: true,
      });
      const isValid = await bcrypt.compare(req.body.password, result.password);

      if (isValid) {
        const { id, username, email, name, balance, points, refferal } = result;
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
            points,
            refferal,
          },
        });
      } else {
        return res.status(400).send({
          succes: false,
          message: "You Are Unauthicate",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  keeplogin: async (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.userData.id,
        },
        process.env.SCRT_TKN,
        {
          expiresIn: "1h",
        }
      );
      const token2 = jwt.verify(token, process.env.SCRT_TKN);
      const resultData = await users.findOne({
        where: {
          id: token2.id,
        },
        attributes: { exclude: ["password", "id"] },
        raw: true,
      });
      return res.status(200).send({
        success: true,
        message: "Login Successfully",
        token,
        result: resultData,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  detail: async (req, res) => {
    console.log(req.token.id);
    try {
      const result = await users.findOne({
        where: {
          id: req.userData.id,
        },
        attributes: { exclude: ["password", "id"] },
        raw: true,
      });
      return res.status(200).send({
        succes: true,
        message: "Get Data Users Successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  update: async (req, res) => {
    try {
      const result = await users.update(
        {
          username: req.body.username,
          name: req.body.name,
          email: req.body.email,
        },
        {
          where: {
            id: req.userData.id,
          },
        }
      );
      return res.status(200).send({
        success: true,
        message: "Account updated successfully",
        result: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.rc || 500).send(error);
    }
  },
  updatePassword: async (req, res) => {
    try {
      if (
        req.body.currentPassword &&
        req.body.newPassword &&
        req.body.confirmPassword
      ) {
        if (req.body.newPassword !== req.body.confirmPassword) {
          return res.status(error.rc || 400).send({
            message: "newPassword and conformPassword doesnt match",
          });
        }

        const result = await users.findOne({
          where: {
            [Op.or]: [{ id: req.userData.id }],
          },
          raw: true,
        });
        console.log("MASUK");
        console.log(result);
        const isValid = await bcrypt.compare(
          req.body.currentPassword,
          result.password
        );
        if (isValid) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
          req.body.newPassword = hashPassword;

          const result = await users.update(
            {
              password: req.body.newPassword,
            },
            {
              where: {
                id: req.userData.id,
              },
            }
          );
          return res.status(200).send({
            success: true,
            message: "Account updated successfully",
            result: result,
          });
        } else {
          return res.status(error.rc || 400).send({
            message: "Input Current Pass Wrong",
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(error.rc || 500).send(error);
    }
  },
  forgotPass: async (req, res, next) => {
    console.log("MASUK");
    try {
      if (req.body.password === req.body.confirmPassword) {
        const token = jwt.verify(req.token, process.env.SCRT_TKN);
        console.log(token.email);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const result = await users.update(
          { password: req.body.password },
          { where: { email: token.email } }
        );
        console.log(result);
        return res.status(200).send("Updated password successfully");
      }
    } catch (error) {
      console.log(error);
      return res.status(error.rc || 500).send(error);
    }
  },
  sentemail: async (req, res, next) => {
    try {
      const result = await users.findOne({
        where: {
          email: req.body.email,
        },
        raw: true,
      });

      if (!result) {
        return res.status(404).send("User not found");
      }

      const token = jwt.sign(
        {
          email: result.email,
        },
        process.env.SCRT_TKN,
        {
          expiresIn: "1h",
        }
      );

      const resetPasswordLink = `http://localhost:5173/forgotpass?token=${token}`;

      await transporter.sendMail({
        from: "admin@gmail.com",
        to: req.body.email,
        subject: "Password Reset",
        html: `<h1>Hello, ${result.username}</h1>
              <a href="${resetPasswordLink}">${resetPasswordLink}</a>`,
      });

      res
        .status(200)
        .send({ succes: true, message: "email sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
