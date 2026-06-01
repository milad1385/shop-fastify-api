const bookmarkService = require("../services/bookmarkService");
const { createPagination } = require("../utils/func");

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
  async getUserBookmarks(req, res) {
    const id = req.user.id;
    let { page, limit, status } = req.query;
    page = +page || 1;
    limit = +limit || 10;

    const { bookmarks, count } = await bookmarkService.findUserBookmarksById(
      id,
      page,
      limit,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "بوک مارک های کاربر با موفقیت دریافت شد",
      data: {
        bookmarks,
        pagination: createPagination(page, limit, count, "Bookmarks"),
      },
    });
  },
};
