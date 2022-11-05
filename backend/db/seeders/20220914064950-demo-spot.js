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
