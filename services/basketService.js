const createError = require("http-errors");
const { Basket, ProductSeller, Product, Seller } = require("../models");
const productService = require("./productService");

module.exports = {
  async findBasketById(id) {
    const basket = await Basket.findOne({ where: { id } });

    return basket;
  },
  async findAllBasketByUserId(userId) {
    const basket = await Basket.findAll({
      where: { user_id: userId },
      include: [{ model: Product, as: "product" }],
    });
  },
  async findUserBasketItemById(userId, basketId) {
    const basketItem = await Basket.findOne({
      where: { id: basketId, user_id: userId },
    });

    return basketItem;
  },
  async findUserBasketById(userId) {
    const basket = await Basket.findAll({
      where: { user_id: userId },
      attributes: {
        exclude: ["user_id", "product_id", "seller_id", "updatedAt"],
      },
      include: [
        { model: Product, as: "product" },
        {
          model: Seller,
          as: "seller",
          attributes: ["name", "province", "city", "phone"],
        },
      ],
    });

    return basket;
  },
  async createBasket(userId, basketInfo) {
    const { product_id, seller_id } = basketInfo;
    const product = await productService.findProductById(product_id);

    if (!product) {
      throw createError.NotFound("محصولی با این آیدی یافت نشد");
    }

    const sellerInfo = await ProductSeller.findOne({
      where: { id: seller_id, product_id },
    });
    if (!sellerInfo) {
      throw createError.NotFound("فروشنده ای با این آیدی یافت نشد");
    }

    let basket = await Basket.findOne({
      where: { product_id, seller_id, user_id: userId },
    });

    if (basket) {
      if (basket.quantity >= sellerInfo.stock) {
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

    return await this.findBasketById(basket.id);
  },
  async deleteBasketItemById(userId, basketId) {
    const basketItem = await this.findUserBasketItemById(userId, basketId);
    if (!basketItem) {
      throw createError.NotFound("آیتمی در سبد خرید با این آیدی پیدا نشد");
    }

    await basketItem.destroy({});

    return basketItem;
  },
  async decreaseBasketItemQtyById(userId, basketId) {
    let basketItem = await this.findUserBasketItemById(userId, basketId);
    if (!basketItem) {
      throw createError.NotFound("آیتمی در سبد خرید با این آیدی پیدا نشد");
    }

    if (basketItem.quantity === 1) {
      basketItem = await basketItem.destroy({});
    } else {
      basketItem = await basketItem.decrement("quantity", {
        by: 1,
      });
    }

    return { ...basketItem, quantity: basketItem.quantity-- };
  },
  async deleteAllBasketByUserId(userId) {
    const basket = await Basket.findAll({ where: { user_id: userId } });
    if (!basket) {
      throw createError.NotFound(
        "محصولی برای این کاربر با این آیدی در سبد خرید یافت نشد",
      );
    }
    await Basket.destroy({ where: { user_id: userId } });

    return basket;
  },
};
