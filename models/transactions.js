"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    static associate(models) {
      transactions.hasMany(models.items, { foreignKey: "transactionid" });
      transactions.hasOne(models.buyers, { foreignKey: "transactionid" });
    }
  }
  transactions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: DataTypes.INTEGER,
      invoice: DataTypes.STRING,
      subtotal: DataTypes.INTEGER,
      fee: DataTypes.INTEGER,
      promocode: DataTypes.STRING,
      payment: DataTypes.STRING,
      ispaid: DataTypes.BOOLEAN,
      deletedAt: DataTypes.DATE,
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
