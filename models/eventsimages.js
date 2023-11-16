'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventsImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      eventsImages.belongsTo(models.events);
    }
  }
  eventsImages.init({
    eventId: DataTypes.INTEGER,
    eventImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'eventsImages',

    paranoid : true,
    deletedAt : "deletedAt",

    defaultScope : {
      attributes : {
        exclude : ["deletedAt"]
      },
    },
  });
  return eventsImages;
};