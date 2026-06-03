const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Basket = sequelize.define(
  "Basket",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue :0
    },
  },
  { timestamps: true },
);

module.exports = Basket;
