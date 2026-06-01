const createError = require("http-errors");
const productService = require("./productService");
const { Bookmark, User, Product } = require("../models");

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
  async findUserBookmarksById(userId, page = 1, limit = 10) {
    const count = await Bookmark.count({ where: { user_id: userId } });
    const bookmarks = await Bookmark.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "username", "avatar"],
        },
        {
          model: Product,
          as: "product",
          attributes: { exclude: ["description"] },
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return { count, bookmarks };
  },
};
