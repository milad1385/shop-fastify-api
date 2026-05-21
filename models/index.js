const User = require("./User");
const Wallet = require("./Wallet");
const Address = require("./Address");
const sequelize = require("../configs/db");

// relation -> User , Wallet
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

// relation -> User , Address

User.hasMany(Address, {
  foreignKey: "user_id",
  as: "addresses",
  onDelete: "CASCADE",
});

Address.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});

module.exports = { User, Wallet, sequelize };
