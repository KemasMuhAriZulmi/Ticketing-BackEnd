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
        promotorId: 1,
        name: "HaraSora",
        description:
          "Harsasora adalah event dies natalis SMA Negeri 1 Sooko. Kegiatan ini akan dilaksanakan pada tanggal 17 Desember 2023, sebagai rasa syukur dan bentuk bahagia SMA Negeri 1 Sooko dalam merayakan ulang tahun yang ke-61.",
        startDate: "2023-12-17",
        endDate: "2023-12-17",
        location: "JKT, GBK",
        category: "concert",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotorId: 2,
        name: "Deliwafa Fest Vol.3",
        description:
          "Deliwafa Fest Vol.3 hadir dengan konsep yang menarik juga menyediakan fasilitas untuk UMKM yang berkeinginan untuk berjualan di acara kami sebagai bentuk kepedulian dan dukungan kami untuk perkembangan UMKM di Indonesia.",
        startDate: "2023-12-24",
        endDate: "2023-12-26",
        location: "Magelang, Alun-Alun",
        category: "concert",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotorId: 3,
        name: "Tulungagung Creative Festival",
        description:
          "Tulungagung Creative Festival merupakan sebuah acara besar yang diadakan untuk meriahkan semangat kreativitas dan hiburan berkualitas di kota Tulungagung.",
        startDate: "2023-12-04",
        endDate: "2023-12-06",
        location: "Tulung Agung, Gelora Tulung Agung",
        category: "concert",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotorId: 4,
        name: "Dalbang Fest",
        description: "Event BTS Army Kediri. Indonesia",
        startDate: "2023-12-24",
        endDate: "2023-12-24",
        location: "Kediri, Tirtayasa",
        category: "concert",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotorId: 5,
        name: "UMKM Festival Indonesia",
        description:
          "UMKM Festival kini hadir dengan konsep yang fresh dan baru",
        startDate: "2023-12-08",
        endDate: "2023-12-08",
        location: "JKT, GBK",
        category: "concert",
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
