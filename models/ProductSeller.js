const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const ProductSeller = sequelize.define(
  "ProductSeller",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey :true
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  { timestamps: true , tableName :"product_seller" },
);

module.exports = ProductSeller;
