// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//      */
//     await queryInterface.bulkInsert(
//       "refferals",
//       [
//         {
//           userid: 1,
//           reffedtimes: false,
//           refferal: "KsI46B",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ],
//       {}
//     );
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   },
// };
