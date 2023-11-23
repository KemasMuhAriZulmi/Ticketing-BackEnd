"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class promotors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      promotors.hasMany(models.events, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  promotors.init(
    {
      role: DataTypes.STRING,
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      jumlahBook: DataTypes.INTEGER,
      totalTransaction: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "promotors",

      paranoid: true,
      deletedAt: "deletedAt",

      defaultScope: {
        attributes: {
          exclude: ["deletedAt"],
        },
      },
    }
  );
  return promotors;
};
