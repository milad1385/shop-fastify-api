const User = require("./User");
const Wallet = require("./Wallet");
const Address = require("./Address");
const Ban = require("./Ban");
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
});

// relation -> User , Ban

User.hasMany(Ban, {
  foreignKey: "user_id",
  as: "bans",
  onDelete: "CASCADE",
});

Ban.belongsTo(User, {
  foreignKey: "user_id",
  as: "banned_user",
  onDelete: "CASCADE",
});

User.hasMany(Ban, {
  foreignKey: "banned_by_id",
  as: "bans_by_admin",
  onDelete: "SET NULL",
});

Ban.belongsTo(User, {
  foreignKey: "banned_by_id",
  as: "banned_by_admin",
  onDelete: "SET NULL",
});

module.exports = { User, Wallet, Address, Ban, sequelize };
