const { Category } = require("../models");

module.exports = {
  async createCategory(title, href, description) {
    const newCategory = await Category.create({
      title,
      href,
      description,
    });

    return newCategory;
  },
};
