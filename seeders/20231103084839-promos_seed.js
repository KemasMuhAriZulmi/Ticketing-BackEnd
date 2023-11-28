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
    await queryInterface.bulkInsert("eventspromotions", [
      {
        eventId: 1,
        voucherName: "promoBCA",
        voucherValue: 30,
        useLimit: 1000,
        needPoint: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 2,
        voucherName: "promoBNI",
        voucherValue: 20,
        useLimit: 1000,
        needPoint: false,
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
