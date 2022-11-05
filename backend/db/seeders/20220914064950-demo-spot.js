'use strict';

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
     await queryInterface.bulkInsert('Spots', [{
      ownerId: 1,
      address: "123 Disney Lane",
      city: "Beverly Hills",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/6399ce4a-1d68-4d96-a20f-4cedb4c3d254.jpeg?im_w=1200',
      name: "Beverly Hills Maison",
      description: "Private",
      pricePerNight: 2445
     },{
      ownerId: 2,
      address: "123 Disney Lane",
      city: "Bullhead City",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Spectacular Riverfront",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/b92fc905-70ea-449a-aa95-c79ade3ceadb.jpeg?im_w=1200',
      description: "Quite possibly",
      pricePerNight: 2600
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49194945/original/c49456c8-8608-446c-9f01-3843adc81945.jpeg?im_w=1200',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['App-Academy'] }
    }, {});
  }
};
