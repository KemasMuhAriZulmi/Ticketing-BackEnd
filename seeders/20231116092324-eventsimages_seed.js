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
    await queryInterface.bulkInsert("eventsimages", [
      {
        eventId : 1,
        eventImage : "public\\events\\1700122633793--artworks-jfuMkpoGWdv2k7om-qZtwgA-t500x500.jpg",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        eventId : 2,
        eventImage : "public\\events\\1700122633793--artworks-jfuMkpoGWdv2k7om-qZtwgA-t500x500.jpg",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        eventId : 3,
        eventImage : "public\\events\\1700122633793--artworks-jfuMkpoGWdv2k7om-qZtwgA-t500x500.jpg",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
    ]);
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
