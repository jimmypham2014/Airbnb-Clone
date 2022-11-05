'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(
        models.User,{foreignKey:'userId'}
        )
      Review.belongsTo(
        models.Spot,{foreignKey:'spotId'}
        )

    }
  }
  Review.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement: true,
      primaryKey:true
    },
    userId: {
     type: DataTypes.INTEGER,
     allowNull:false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    review:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
    stars: 
    {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        min:1,
        max:5
      }
    },
    previewImage:{
      type:DataTypes.STRING,
      allowNull:true
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};