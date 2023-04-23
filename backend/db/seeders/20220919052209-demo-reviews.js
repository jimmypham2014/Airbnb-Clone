'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Reviews'
     await queryInterface.bulkInsert(options, [{
      userId: 1,
      spotId: 1,
      review: "This was an awesome spot!",
      stars: 5,
     },{
      userId: 2,
      spotId: 2,
      review: "This place is so goooodd",
      stars: 4,
     },{
      userId: 3,
      spotId: 3,
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
     options.tableName = 'Reviews'
     await queryInterface.bulkDelete(options, null, {});
  }
};
