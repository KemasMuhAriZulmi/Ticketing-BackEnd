"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("promotors", [
      {
        username: "promotor-1",
        name: "promotor-1",
        email: "p1@mail.com",
        password: "qwertyuiop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "promotor-2",
        name: "promotor-2",
        email: "p2@mail.com",
        password: "qwertyuiop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
