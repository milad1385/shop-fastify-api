const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Order = sequelize.define(
  "Order",
  {
    payed_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    total_price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    seller_discount:{
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    final_price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    discount_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: "set",
      values: ["set", "cancel", "paid", "pending"],
    },
  },
  { timestamps: true },
);

module.exports = Order
