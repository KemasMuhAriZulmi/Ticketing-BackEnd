"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class refferals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      refferals.hasOne(models.user);
    }
  }
  refferals.init(
    {
      userid: DataTypes.INTEGER,
      reffedtimes: DataTypes.INTEGER,
      refferal: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "refferals",
    }
  );
  return refferals;
};
