'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.User)
      cart.hasMany(models.dish)
    }
  }
  cart.init({
    // orderId: DataTypes.INTEGER,
    // paymentId: DataTypes.INTEGER,
    // totalAmount: DataTypes.INTEGER
    userId: DataTypes.INTEGER,
    dishId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};