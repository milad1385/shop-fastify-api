const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const ProductSeller = sequelize.define(
  "ProductSeller",
  {
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
  { timestamps: true },
);

module.exports = ProductSeller;
