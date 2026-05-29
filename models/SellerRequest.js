const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const SellerRequest = sequelize.define(
  "SellerRequest",
  {
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
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
    },
    periority: {
      type: DataTypes.INTEGER,

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
