const createError = require("http-errors");
const { Category, Product } = require("../models");

module.exports = {
  async findCategoryById(id) {
    const category = await Category.findOne({ where: { id } });
    return category;
  },
  async findAllCategories(page = 1, limit = 10) {
    const count = await Category.count();
    const categories = await Category.findAll({
      where: { parent_id: null },
      include: [
        {
          model: Category,
          as: "sub_category",
          include: [
            {
              model: Category,
              as: "sub_category",
            },
          ],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return { count, categories };
  },
  async createCategory(title, href, description, parentId = null) {
    const newCategory = await Category.create({
      title,
      href,
      description,
      parent_id: parentId,
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
  async findOneCategory(id) {
    const category = await Category.findOne({
      where: { id },
      include: [
        { model: Product, as: "products", through: { attributes: [] } },
      ],
    });
    if (!category) {
      throw createError.NotFound("دسته بندی با این آیدی پیدا نشد");
    }
    return category;
  },
};
