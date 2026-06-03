const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const OrderItem = sequelize.define(
  "OrderItem",
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
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "order_item" },
);

module.exports = OrderItem;
