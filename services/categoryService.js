const createError = require("http-errors");
const { Category } = require("../models");

module.exports = {
  async findCategoryById(id) {
    const category = await Category.findOne({ where: { id } });
    return category;
  },
  async findAllCategories(page = 1, limit = 10) {
    const count = await Category.count();
    const categories = await Category.findAll({
      limit,
      offset: (page - 1) * limit,
    });

    return { count, categories };
  },
  async createCategory(title, href, description) {
    const newCategory = await Category.create({
      title,
      href,
      description,
    });

    return newCategory;
  },
  async deleteCategoryById(id) {
    const category = await this.findCategoryById(id);

    if (!category) {
      throw createError.NotFound("دسته بندی با این آیدی پیدا نشد");
    }
    await category.destroy({});
    return category;
  },
  async updateCategoryById(id, title, href, description) {
    const category = await this.findCategoryById(id);

    if (!category) {
      throw createError.NotFound("دسته بندی با این آیدی پیدا نشد");
    }
    await category.update({ title, href, description });
    return await Category.findOne({ where: { id } });
  },
};
