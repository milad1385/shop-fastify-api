const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const SellerRequest = sequelize.define(
  "SellerRequest",
  {
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["accept", "reject", "pending"],
      defaultValue: "pending",
      allowNull: false,
    },
    periority: {
      type: DataTypes.ENUM,
      values: [1, 2, 3],
      defaultValue: 1,
      allowNull: false,
    },
    adminComment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, tableName: "seller_request" },
);

module.exports = SellerRequest;
