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
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Temecula",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-689337770931210679/original/93a88dfd-b0d8-4a18-8e7e-c745f501d9d9.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/cc4e2a37-0741-42b7-9a1c-e9e7de8ff639.jpg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-580398742042753105/original/cf49334a-eee6-4ce2-9ecb-4170b1b22c34.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/b79510c8-86ad-4cf6-a7d1-6dfd182869a9.jpg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-660968368016497555/original/3f818e01-0555-4574-a9e7-b2d39f3ba2a2.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-53434463/original/2e7abca7-dd82-4680-915c-c38544788fde.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-776687898482054308/original/a52c7479-eec0-4258-ae7b-ada7383e02d9.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51321026/original/c921e605-40d4-4339-84c3-bc098b72fb1d.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-654349142837152587/original/a5e82257-0568-411d-ae56-bfc9a707efd2.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-763026376315174405/original/856965d7-dda4-43fa-a39f-c48a1cc07dd2.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-584769197556151646/original/5d55a179-41c3-43f1-acac-62adf5bac566.png?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-705182673236160293/original/3526ccbf-e797-40d8-b9d5-cbdc4c917bfc.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-769087188726515394/original/3537fd5f-614b-46b8-866a-97044645d1ba.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48427474/original/e03d7445-4bb8-4253-9ab2-3e477d670587.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-636219331045842976/original/d0e819f8-507b-4992-b0f2-a611de32ef2c.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/ec9096ce-191e-45b8-8524-92e02f725963.jpg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52171554/original/fb531b59-fe9a-461c-a05f-99a2554030a4.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-50033176/original/46c282e7-0657-4893-8f9e-e36a17572ad4.jpeg?im_w=960',
      description: "Place where web developers are created",
      pricePerNight: 1483
     },{
      ownerId: 3,
      address: "123 Disney Lane",
      city: "Big Bear",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Black Rock",
      previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51089900/original/60d90c8d-f48b-41d8-a8f8-bf1c5bbd6e8f.jpeg?im_w=960',
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
