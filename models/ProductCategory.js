const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { timestamps: true, tableName: "product_category" },
);

module.exports = ProductCategory;
