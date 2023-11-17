'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('promotors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // surutan ---------------------- dikasi defaultValue, biar ga perlu input role manual
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "promotor"
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      jumlahbook: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      // ! Di mas gibran ga ada totaltransaction
      totaltransaction: {
        type: Sequelize.INTEGER,
        defaultValue : 0
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
    await queryInterface.dropTable('promotors');
  }
};