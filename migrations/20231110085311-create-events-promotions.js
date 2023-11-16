'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('eventsPromotions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : "events",
          key : "id"
        }
      },
      voucherName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      voucherValue: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      useLimit: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      needPoint: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue : null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('eventsPromotions');
  }
};