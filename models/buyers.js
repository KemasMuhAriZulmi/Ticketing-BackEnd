'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buyers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  buyers.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
    poscode: DataTypes.STRING,
    address: DataTypes.STRING,
    transactionid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'buyers',
  });
  return buyers;
};