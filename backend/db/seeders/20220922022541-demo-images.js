'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Images'
    await queryInterface.bulkInsert(options, [{
      reviewImageId: 1,
      spotImageId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/b92fc905-70ea-449a-aa95-c79ade3ceadb.jpeg?im_w=1200',
     },{
      reviewImageId: 2,
      spotImageId: 2,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49194945/original/c49456c8-8608-446c-9f01-3843adc81945.jpeg?im_w=1200',
     },{
      reviewImageId: 3,
      spotImageId: 3,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/6399ce4a-1d68-4d96-a20f-4cedb4c3d254.jpeg?im_w=1200',
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
     options.tableName = 'Images'
     await queryInterface.bulkDelete(options, null, {});
  }
};
