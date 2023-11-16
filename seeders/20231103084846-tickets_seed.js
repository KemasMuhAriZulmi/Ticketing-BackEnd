'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
      eventId : 1,
      ticketType : "vvip",
      price : 1000000,
      quota : 100,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      eventId : 1,
      ticketType : "vip",
      price : 500000,
      quota : 200,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      eventId : 2,
      ticketType : "vvip",
      price : 2000000,
      quota : 90,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      eventId : 2,
      ticketType : "vip",
      price : 1500000,
      quota : 150,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      eventId : 3,
      ticketType : "vvip",
      price : 2100000,
      quota : 91,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      eventId : 3,
      ticketType : "vip",
      price : 1510000,
      quota : 151,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
