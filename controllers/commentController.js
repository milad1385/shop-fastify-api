const commentService = require("../services/commentService");
const { createPagination } = require("../utils/func");

module.exports = {
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
  async getProductComments(req, res) {
    const { id } = req.params;
    let { page, limit } = req.query;
    page = +page || 1;
    limit = +limit || 10;
    const { comments, count } = await commentService.getProductCommentsById(
      id,
      page,
      limit,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "کامنت های محصول با موفقیت دریافت شد",
      data: {
        comments,
        pagination: createPagination(page, limit, count, "Comments"),
      },
    });
  },
  async getUserComments(req, res) {
    const id = req.user.id;
    let { page, limit, status } = req.query;
    page = +page || 1;
    limit = +limit || 10;

    const { comments, count } = await commentService.getUserCommentsById(
      page,
      limit,
      status,
      id,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "کامنت های کاربر با موفقیت دریافت شد",
      data: {
        comments,
        pagination: createPagination(page, limit, count, "Comments"),
      },
    });
  },
  async changeCommentStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const updatedComment = await commentService.changeCommentStatusById(
      id,
      status,
    );

    return res.status(200).send({
      statusCode: 200,
      message: `کامنت با موفقیت ${status === "accept" ? "تایید" : "رد"} شد`,
      data: updatedComment,
    });
  },
  async addNewComment(req, res) {
    const userId = req.user.id;
    const newComment = await commentService.createNewComment(userId, req.body);

    return res.status(201).send({
      statusCode: 201,
      message: "کامنت با موفقیت ثبت شد",
      data: newComment,
    });
  },
  async deleteComment(req, res) {
    const { id } = req.params;
    const deletedComment = await commentService.deleteCommentById(id);

    return res.status(200).send({
      statusCode: 200,
      message: "کامنت با موفقیت حذف شد",
      data: deletedComment,
    });
  },
  async updateComment(req, res) {
    const { id } = req.params;
    const { text } = req.body;
    const updatedComment = await commentService.updateCommentTextById(id, text);

    return res
      .status(200)
      .send({
        statusCode: 200,
        message: "کامنت با موفقیت آپدیت شد",
        data: updatedComment,
      });
  },
};
