const createError = require("http-errors");
const productService = require("./productService");
const { Bookmark } = require("../models");

module.exports = {
  async createBookmark(userId, productId) {
    const product = await productService.findProductById(productId);
    if (!product) {
      throw createError.NotFound("محصولی با این آیدی یافت نشد");
    }

    const alreadyBookmark = await Bookmark.findOne({
      where: { user_id: userId, product_id: productId },
    });

    if (alreadyBookmark) {
      await Bookmark.destroy({
        where: { id: alreadyBookmark.id },
      });
      return false;
    }

    const newBookmark = await Bookmark.create({
      user_id: userId,
      product_id: productId,
    });

    return newBookmark;
  },
};
