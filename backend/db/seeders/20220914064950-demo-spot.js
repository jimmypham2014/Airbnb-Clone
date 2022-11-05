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
      name: "Beverly Hills Maison",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/b92fc905-70ea-449a-aa95-c79ade3ceadb.jpeg?im_w=1200',
      description: "Private, gated French country chateau-inspired home sits at the end of a cul de sac on nearly 2 acres of land and is surrounded by stately trees, mature landscaping, and verdant canyon views. Beautifully living room with fireplace, formal dining room, large kitchen, and light-filled breakfast area. Spectacular canyon views from every room and nearby access to Beverly Hills, and the valley. Expansive backyard and pool area.",
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
      previewImage:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49194945/original/c49456c8-8608-446c-9f01-3843adc81945.jpeg?im_w=1200',
      description: "Quite possibly the most spectacular home on The Colorado River! Gated entrance allures you to this estate.",
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
      previewImage:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/6399ce4a-1d68-4d96-a20f-4cedb4c3d254.jpeg?im_w=1200',
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
