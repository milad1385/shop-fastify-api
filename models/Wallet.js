const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Wallet = sequelize.define(
  "Wallet",
  {
    amount: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Wallet;
