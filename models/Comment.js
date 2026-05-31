const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Comment = sequelize.define(
  "Comment",
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 5,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "accept", "reject"],
      defaultValue: "pending",
    },
    is_order: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  { timestamps: true },
);

module.exports = Comment;
