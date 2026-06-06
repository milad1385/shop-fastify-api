const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Menu = sequelize.define(
  "Menu",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    href: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = Menu;
