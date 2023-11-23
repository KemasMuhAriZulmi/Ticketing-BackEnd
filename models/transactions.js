"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transactions.init(
    {
      userid: DataTypes.INTEGER,
      invoice: DataTypes.STRING,
      subtotal: DataTypes.INTEGER,
      fee: DataTypes.INTEGER,
      promocode: DataTypes.STRING,
      payment: DataTypes.STRING,
      ispaid: DataTypes.BOOLEAN,
      deleteAt: DataTypes.DATE,
      buyerid: DataTypes.INTEGER,
      bookingdate: DataTypes.DATE,
      eventid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transactions",
    }
  );
  return transactions;
};
