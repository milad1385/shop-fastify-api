const User = require("./User");
const Wallet = require("./Wallet");
const Address = require("./Address");
const Ban = require("./Ban");
const Category = require("./Category");
const Product = require("./Product");
const Seller = require("./Seller");
const SellerRequest = require("./SellerRequest");
const ProductSeller = require("./ProductSeller");
const ProductCategory = require("./ProductCategory");
const Comment = require("./Comment");
const Bookmark = require("./Bookmark");
const DiscountCode = require("./DiscountCode");
const Basket = require("./Basket");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
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

// relation seller -> user
User.hasOne(Seller, {
  foreignKey: "user_id",
  as: "seller",
  onDelete: "CASCADE",
});
Seller.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// relation -> product , seller
Product.belongsToMany(Seller, {
  through: ProductSeller,
  foreignKey: "product_id",
  otherKey: "seller_id",
  as: "sellers",
  onDelete: "CASCADE",
});

Seller.belongsToMany(Product, {
  through: ProductSeller,
  foreignKey: "seller_id",
  otherKey: "product_id",
  as: "products",
});

// relation -> seller request , product , seller
Seller.hasMany(SellerRequest, {
  foreignKey: "seller_id",
  as: "requests",
  onDelete: "CASCADE",
});

SellerRequest.belongsTo(Seller, { foreignKey: "seller_id", as: "seller" });

Product.hasMany(SellerRequest, {
  foreignKey: "product_id",
  as: "sellerRequests",
});

SellerRequest.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// relation -> product , category

Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "product_id",
  otherKey: "category_id",
  as: "categories",
  onDelete: "CASCADE",
});

Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: "category_id",
  otherKey: "product_id",
  as: "products",
});

// relation -> comment , user , product , seller

User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "comments",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });

Product.hasMany(Comment, {
  foreignKey: "product_id",
  as: "comments",
  onDelete: "CASCADE",
});
Comment.belongsTo(Product, { foreignKey: "product_id", as: "product" });

Seller.hasMany(Comment, {
  foreignKey: "seller_id",
  as: "comments",
  onDelete: "CASCADE",
});
Comment.belongsTo(Seller, { foreignKey: "seller_id", as: "seller" });

// relation -> bookmark , user , product
User.hasMany(Bookmark, { foreignKey: "user_id", as: "bookmarks" });
Bookmark.belongsTo(User, { foreignKey: "user_id", as: "user" });
Bookmark.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// relation -> Basket , user , product , seller

Basket.belongsTo(User, { foreignKey: "user_id", as: "user" });
Basket.belongsTo(Product, { foreignKey: "product_id", as: "product" });
Basket.belongsTo(ProductSeller, { foreignKey: "seller_id", as: "seller" });

// relation -> order , user , address , order_item
Order.belongsTo(User, { foreignKey: "user_id", as: "user" });
Order.belongsTo(Address, { foreignKey: "address_id", as: "address" });
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "order_items" });

// relation -> order item , product
OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
module.exports = {
  User,
  Wallet,
  Address,
  Ban,
  Category,
  Seller,
  Product,
  ProductCategory,
  ProductSeller,
  SellerRequest,
  Comment,
  Bookmark,
  DiscountCode,
  Basket,
  Order,
  sequelize,
};
