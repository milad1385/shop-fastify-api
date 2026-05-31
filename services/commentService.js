const { Comment } = require("../models");

module.exports = {
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
};
