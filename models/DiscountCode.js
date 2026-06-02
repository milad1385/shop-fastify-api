const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const DiscountCode = sequelize.define(
  "DiscountCode",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: "enable",
      values: ["enable", "disable"],
    },
    off_percent: {
      type: DataTypes.TINYINT,
      defaultValue: 10,
    },
  },
  { timestamps: true, tableName: "discount_code" },
);

module.exports = DiscountCode;
