const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Category = sequelize.define(
  "Category",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    href: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = Category;
