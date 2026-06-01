const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Bookmark = sequelize.define(
  "Bookmark",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
    allowNull: false,
    },
  },
  { timestamps: true, tableName: "Bookmark_product" },
);

module.exports = Bookmark
