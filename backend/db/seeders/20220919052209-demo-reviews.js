'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Reviews', [{
      id: 1,
      userId: 1,
      spotId: 1,
      review: "This was an awesome spot!",
      stars: 5,
     },{
      id: 2,
      userId: 1,
      spotId: 1,
      review: "This place is so goooodd",
      stars: 4,
     },{
      id: 3,
      userId: 1,
      spotId: 1,
      review: "LAMEEEE spot",
      stars: 3,
     },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {});
  }
};
