const db = require('../models');
const {promotors} = require('../models/promotors');
const {events} = require('../models/events');
const {tickets} = require('../models/tickets');


module.exports = {
  createVoucher : async (req, res, next) => {
    try {
      const {name, discount} = req.body;
      const voucher = await db.vouchers.create({name, discount});
      res.status(200).send(voucher);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};