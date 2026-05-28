const User = require("./User");
const Wallet = require("./Wallet");
const Address = require("./Address");
const Ban = require("./Ban");
const Category = require("./Ban");
const Product = require("./Product");
const Seller = require("./Seller");
const ProductSeller = require("./ProductSeller");
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

// relation -> product , seller
Product.belongsToMany(Seller, {
  through: ProductSeller,
  foreignKey: "product_id",
  otherKey: "seller_id",
  as: "sellers",
});

Seller.belongsToMany(Product, {
  through: ProductSeller,
  foreignKey: "seller_id",
  otherKey: "product_id",
  as: "products",
});

// relation -> product , category

Product.belongsToMany(Category, {
  through: "product_category",
  foreignKey: "product_id",
  otherKey: "category_id",
  as: "categories",
});

Category.belongsToMany(Product, {
  through: "product_category",
  foreignKey: "category_id",
  otherKey: "product_id",
  as: "products",
});

module.exports = {
  User,
  Wallet,
  Address,
  Ban,
  Category,
  Seller,
  Product,
  sequelize,
};
