const createError = require("http-errors");
const { Basket, ProductSeller } = require("../models");
const productService = require("./productService");

module.exports = {
  async createBasket(userId, basketInfo) {
    const { product_id, seller_id } = basketInfo;
    const product = await productService.findProductById(product_id);

    if (!product) {
      throw createError.NotFound("محصولی با این آیدی یافت نشد");
    }

    const sellerInfo = await ProductSeller.findOne({ seller_id, product_id });
    if (!sellerInfo) {
      throw createError.NotFound("فروشنده ای با این آیدی یافت نشد");
    }

    let basket = await Basket.findOne({
      product_id,
      seller_id,
      user_id: userId,
    });

    if (basket) {
      if (basket.quantity > sellerInfo.stock) {
        throw createError.BadRequest("تعداد محصول بیشتر از موجودی فروشنده است");
      }
      basket = await basket.increment("quantity", {
        by: 1,
      });
    } else {
      basket = await Basket.create({
        quantity: 1,
        product_id,
        seller_id,
        user_id: userId,
        price: sellerInfo.price,
        discount: sellerInfo.discount,
      });
    }

    return basket;
  },
};
