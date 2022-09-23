'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [{
      reviewImageId: 1,
      spotImageId: 1,
      url: "image url",
     },{
      reviewImageId: 2,
      spotImageId: 2,
      url: "image url",
     },{
      reviewImageId: 3,
      spotImageId: 3,
      url: "image url",
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
     await queryInterface.bulkDelete('Images', null, {});
  }
};
