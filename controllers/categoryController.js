const categoryService = require("../services/categoryService");
const { createPagination } = require("../utils/func");

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

    return res.status(200).send({
      statusCode: 200,
      message: "دسته بندی با موفقیت حذف شد",
      data: deletedCatefory,
    });
  },
  async updateCategory(req, res) {
    const { id } = req.params;
    const updatedCategory = await categoryService.updateCategoryById(id);

    return res.status(200).send({
      statusCode: 200,
      message: "دسته بندی با موفقیت آپدیت شد",
      data: updatedCategory,
    });
  },
  async getCategories(req, res) {
    let { page, limit } = req.query;
    page = +page || 1;
    limit = +limit || 10;
    const { count, categories } = await categoryService.findAllCategories(
      page,
      limit,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "لیست دسته بندی ها با موفقیت دریافت شد",
      data: {
        categories,
        pagination: createPagination(page, limit, count, "Categories"),
      },
    });
  },
};
