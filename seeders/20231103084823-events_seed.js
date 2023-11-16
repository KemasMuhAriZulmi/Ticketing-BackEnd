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
    await queryInterface.bulkInsert("events", [
      {
        promotorId : 1,
        name : "coldplay",
        description : "coldplay lorem yadayada",
        startDate : "2023-11-02",
        endDate : "2023-11-02",
        location : "JKT, GBK",
        category : "concert",
        // ! CANT without created and updated - TRIED
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        promotorId : 2,
        name : "starset",
        description : "starset lorem yadayada",
        startDate : "2023-11-02",
        endDate : "2023-11-02",
        location : "JKT, GBK",
        category : "concert",
        // ! with created and updated
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        promotorId : 2,
        name : "starset 2",
        description : "starset 2 lorem yadayada",
        startDate : "2023-11-02",
        endDate : "2023-11-02",
        location : "JKT, GBK",
        category : "concert",
        // ! CANT without created and updated - TRIED
        createdAt : new Date(),
        updatedAt : new Date(),
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
