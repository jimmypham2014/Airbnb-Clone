'use strict';
const { ValidatorsImpl } = require('express-validator/src/chain');
const {
  Model,Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId'}
      )
    }
  }
  Spot.init({
    id: {
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    address: {
     type:DataTypes.STRING,
     allowNull:false,
     valdiate:{
      notEmpty:true
     }
    },
    city:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: true
      }
      
    },
    state:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isAlpha:true,
        notEmpty: true
      }
    },
    country:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: true
      }
    },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        isDecimal: true,
      }
    },
    lng: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        isDecimal: true,
        }
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[5,50]
      }
      },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    pricePerNight: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    avgRating:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    previewImage: {
      type:DataTypes.BLOB,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};