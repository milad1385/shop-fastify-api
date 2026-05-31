const createError = require("http-errors");
const { Comment, User, Product, Seller } = require("../models");
const productService = require("./productService");

module.exports = {
  async findCommentById(id) {
    const comment = await Comment.findOne({ id });
    return comment;
  },
  async createNewComment(userId, commentInfo) {
    const { text, score, productId, sellerId } = commentInfo;
    const newProduct = await Comment.create({
      text,
      score,
      product_id: productId,
      user_id: userId,
      seller_id: sellerId,
      is_order: sellerId ? true : false,
    });

    return newProduct;
  },
  async getAllComments(page = 1, limit = 10) {
    const count = await Comment.count();

    const comments = await Comment.findAll({
      attributes: {
        exclude: ["seller_id", "user_id", "product_id"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "username", "avatar", "role", "email"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["title", "href"],
        },
        {
          model: Seller,
          as: "seller",
          attributes: ["name", "province", "city"],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return { comments, count };
  },
  async getUserCommentsById(page = 1, limit = 10, userId) {
    const count = await Comment.count({where: { user_id: userId },});
    const comments = await Comment.findAll({
      where: { user_id: userId },
      attributes: {
        exclude: ["seller_id", "user_id", "product_id"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "username", "avatar", "role", "email"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["title", "href"],
        },
        {
          model: Seller,
          as: "seller",
          attributes: ["name", "province", "city"],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return { comments, count };
  },
  async deleteCommentById(commentId) {
    const comment = await this.findCommentById(id);

    if (!comment) {
      throw createError.NotFound("کامنتی با این آیدی یافت نشد");
    }

    await comment.destroy({});

    return await this.findCommentById(commentId);
  },
  async getProductCommentsById(productId) {
    const product = await productService.findProductById(productId);

    if (!product) {
      throw createError.NotFound("محصولی با این آیدی یافت نشد");
    }
    const comments = await Comment.findAll({
      where: { product_id: productId },
      attributes: {
        exclude: ["seller_id", "user_id", "product_id"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "username", "avatar", "role", "email"],
        },
        {
          model: Seller,
          as: "seller",
          attributes: ["name", "province", "city"],
        },
      ],
    });

    return comments;
  },
};
