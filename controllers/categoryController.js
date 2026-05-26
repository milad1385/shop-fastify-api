const categoryService = require("../services/categoryService");

module.exports = {
  async addCategory(req, res) {
    const { title, description, href } = req.body;
    const newCategory = await categoryService.createCategory(
      title,
      description,
      href,
    );

    return res
      .status(201)
      .send({
        statusCode: 201,
        message: "دسته بندی با موفقیت ساخته شد",
        data: newCategory,
      });
  },
};
