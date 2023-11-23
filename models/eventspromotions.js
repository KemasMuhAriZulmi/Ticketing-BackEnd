'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventsPromotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      eventsPromotions.belongsTo(models.events);
    }
  }
  eventsPromotions.init({
    eventId: DataTypes.INTEGER,
    voucherName: DataTypes.STRING,
    voucherValue: DataTypes.INTEGER,
    useLimit: DataTypes.INTEGER,
    needPoint: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'eventsPromotions',

    paranoid : true,
    deletedAt : "deletedAt",

    defaultScope : {
      attributes : {
        exclude : ["deletedAt"]
      },
    },
  });
  return eventsPromotions;
};