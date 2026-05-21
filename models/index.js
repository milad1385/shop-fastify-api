const User = require("./User");
const Wallet = require("./Wallet");
const sequelize = require("../configs/db");

User.hasOne(Wallet, { foreignKey: "user_id", as: "wallet" });
Wallet.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = { User, sequelize };
