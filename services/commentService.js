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
        { model: Comment, as: "sub_comments" },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return { comments, count };
  },
  async getUserCommentsById(page = 1, limit = 10, status = "all", userId) {
    let where = { user_id: userId };
    if (status !== "all") {
      where.status = status;
    }
    const count = await Comment.count({ where });
    const comments = await Comment.findAll({
      where,
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
        {
          model: Comment,
          as: "sub_comments",
          attributes: {
            exclude: ["seller_id", "user_id", "product_id"],
          },
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
  async getProductCommentsById(productId, page = 1, limit = 10) {
    const count = await Comment.count({
      where: { product_id: productId, status: "accept" },
    });
    const product = await productService.findProductById(productId);

    if (!product) {
      throw createError.NotFound("محصولی با این آیدی یافت نشد");
    }
    const comments = await Comment.findAll({
      where: { product_id: productId, status: "accept" },
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
        {
          model: Comment,
          as: "sub_comments",
          attributes: {
            exclude: ["seller_id", "user_id", "product_id"],
          },
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return { count, comments };
  },
  async changeCommentStatusById(commentId, status = "pending") {
    const comment = await this.findCommentById(commentId);
    if (!comment) {
      throw createError.NotFound("کامنتی با این آیدی پیدا نشد");
    }

    await comment.update({ status });

    return this.findCommentById(commentId);
  },
  async updateCommentTextById(commentId, text) {
    const comment = await this.findCommentById(commentId);
    if (!comment) {
      throw createError.NotFound("کامنتی با این آیدی یافت نشد");
    }
    await comment.update({ text });

    return await this.findCommentById(commentId);
  },
};
