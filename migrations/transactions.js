"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.INTEGER,
      },
      invoice: {
        type: Sequelize.STRING,
      },
      subtotal: {
        type: Sequelize.INTEGER,
      },
      fee: {
        type: Sequelize.INTEGER,
        defaultValue: 1500,
      },
      promocode: {
        type: Sequelize.STRING,
      },
      payment: {
        type: Sequelize.STRING,
      },
      ispaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      bookingdate: {
        type: Sequelize.DATE,
      },
      eventid: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
