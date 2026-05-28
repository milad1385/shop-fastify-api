const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Seller = sequelize.define(
  "Seller",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["accept", "reject", "pending"],
      defaultValue: "pending",
      allowNull: true,
    },
  },
  { timestamps: true },
);

module.exports = Seller;
