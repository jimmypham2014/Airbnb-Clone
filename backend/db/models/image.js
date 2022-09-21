'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Spot, {foreignKey:'spotImageId'})
      Image.belongsTo(models.Review,{foreignKey:'reviewImageId'})
    }
  }
  Image.init({
    id: {
      type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    reviewImageId:{
      type:DataTypes.INTEGER,
    },
    spotImageId:{
      type:DataTypes.INTEGER,
    },
    previewImage: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};