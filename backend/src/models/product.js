'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    new_prices: DataTypes.NUMBER,
    old_prices: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};