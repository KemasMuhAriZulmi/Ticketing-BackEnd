'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tickets.belongsTo(models.events);
    }
  }
  tickets.init({
    eventId: DataTypes.INTEGER,
    ticketType: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tickets',

    paranoid : true,
    deletedAt : "deletedAt",

    defaultScope : {
      attributes : {
        exclude : ["deletedAt"]
      },
    },
  });
  return tickets;
};