'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      events.belongsTo(models.promotors);
      events.hasMany(models.eventsPromotions, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      });
      events.hasMany(models.eventsImages, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      });
      events.hasMany(models.tickets, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      });
    }
  }
  events.init({
    promotorId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    location: DataTypes.STRING,
    category: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'events',

    paranoid : true,
    deletedAt : "deletedAt",

    defaultScope : {
      attributes : {
        exclude : ["deletedAt"]
      },
    },
  });
  return events;
};