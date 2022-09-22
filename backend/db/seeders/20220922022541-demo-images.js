'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [{
      id: 1,
      reviewImageId: 1,
      spotImageId: 1,
      url: "image url",
     },{
      id: 2,
      reviewImageId: 2,
      spotImageId: 2,
      url: "image url",
     },{
      id: 3,
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
