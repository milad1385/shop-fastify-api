const commentService = require("../services/commentService");
const { createPagination } = require("../utils/func");

module.exports = {
  async addNewComment(req, res) {
    const userId = req.user.id;
    const newComment = await commentService.createNewComment(userId, req.body);

    return res.status(201).send({
      statusCode: 201,
      message: "کامنت با موفقیت ثبت شد",
      data: newComment,
    });
  },
  async getComments(req, res) {
    let { page, limit } = req.query;
    page = +page || 1;
    limit = +limit || 10;
    const { comments, count } = await commentService.getAllComments(
      page,
      limit,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "کامنت ها با موفقیت دریافت شد",
      data: {
        comments,
        pagination: createPagination(page, limit, count, "Comments"),
      },
    });
  },
};
