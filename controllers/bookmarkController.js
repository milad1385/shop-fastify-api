const bookmarkService = require("../services/bookmarkService");

module.exports = {
  async addBookmark(req, res) {
    const userId = req.user.id;
    const { productId } = req.body;

    const newBookmark = await bookmarkService.createBookmark(userId, productId);

    if (!newBookmark)
      return res.status(200).send({
        statusCode: 200,
        message: "بوک مارک با موفقیت حذف شد",
        data: newBookmark,
      });

    return res.status(201).send({
      statusCode: 201,
      message: "بوک مارک با موفقیت اضافه شد",
      data: newBookmark,
    });
  },
};
