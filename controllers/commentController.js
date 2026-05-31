const commentService = require("../services/commentService");

module.exports = {
  async addNewComment(req, res) {
    const userId = req.user.id;
    const newComment = await commentService.createNewComment(userId, req.body);

    return res
      .status(201)
      .send({
        statusCode: 201,
        message: "کامنت با موفقیت ثبت شد",
        data: newComment,
      });
  },
};
