'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Spots',
          key:'id'
        },
        onDelete:'cascade'
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users',
          key: 'id'
        },
      },
      numGuests:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      startDate: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      endDate: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};