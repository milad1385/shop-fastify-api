const User = require("./User");
const Wallet = require("./Wallet");
const sequelize = require("../configs/db");

User.hasOne(Wallet, {
  foreignKey: "user_id",
  as: "wallet",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Wallet.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = { User, Wallet, sequelize };
