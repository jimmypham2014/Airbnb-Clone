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
     },{
      id: 4,
      userId: 1,
      spotId: 2,
      review: "LAMEEEE spot",
      stars: 3,
     },{
      id: 5,
      userId: 1,
      spotId: 2,
      review: "LAMEEEE spot",
      stars: 2,
     },
     {
      id: 6,
      userId: 1,
      spotId: 3,
      review: "LAMEEEE spot",
      stars: 3,
     },{
      id: 7,
      userId: 1,
      spotId: 3,
      review: "LAMEEEE spot",
      stars: 3,
     },{
      id: 8,
      userId: 1,
      spotId: 3,
      review: "LAMEEEE spot",
      stars: 5,
     }
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
