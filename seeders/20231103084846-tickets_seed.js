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
    await queryInterface.bulkInsert("tickets", [
      {
        eventId: 1,
        ticketType: "Regular",
        price: 40000,
        quota: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 1,
        ticketType: "Premium",
        price: 20000,
        quota: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 1,
        ticketType: "Golden",
        price: 30000,
        quota: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 2,
        ticketType: "Regular",
        price: 40000,
        quota: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 2,
        ticketType: "Premium",
        price: 20000,
        quota: 91,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 3,
        ticketType: "Regular",
        price: 30000,
        quota: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 3,
        ticketType: "Premium",
        price: 25000,
        quota: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 3,
        ticketType: "Golden",
        price: 70000,
        quota: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 4,
        ticketType: "Regular",
        price: 15000,
        quota: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 4,
        ticketType: "Premium",
        price: 80000,
        quota: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 4,
        ticketType: "Golden",
        price: 200000,
        quota: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 5,
        ticketType: "Regular",
        price: 75000,
        quota: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 5,
        ticketType: "Premium",
        price: 80000,
        quota: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 5,
        ticketType: "Golden",
        price: 10000,
        quota: 151,
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
