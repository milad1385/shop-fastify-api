const categoryService = require("../services/categoryService");

module.exports = {
  async addCategory(req, res) {
    const { title, description, href } = req.body;
    const newCategory = await categoryService.createCategory(
      title,
      description,
      href,
    );

    return res.status(201).send({
      statusCode: 201,
      message: "دسته بندی با موفقیت ساخته شد",
      data: newCategory,
    });
  },
  async deleteCategory(req, res) {
    const { id } = req.params;
    const deletedCatefory = await categoryService.deleteCategoryById(id);

    return res
      .status(200)
      .send({
        statusCode: 200,
        message: "دسته بندی با موفقیت حذف شد",
        data: deletedCatefory,
      });
  },
};
