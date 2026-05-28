const createError = require("http-errors");
const { Product, Category } = require("../models");

module.exports = {
  async findProductById(id) {
    const product = await Product.findOne({
      where: { id },
      include: [
        {
          model: Category,
          as: "categories",
          through: { attributes: [] },
        },
      ],
    });

    return product;
  },
  async createNewProduct(productInfo) {
    const {
      title,
      href,
      short_identifier,
      description,
      categoryIds = [],
    } = productInfo;

    const newProduct = await Product.create({
      title,
      href,
      short_identifier,
      description,
    });

    if (categoryIds.length > 0) {
      const categories = await Category.findAll({
        where: { id: categoryIds },
      });

      await newProduct.addCategories(categories);
    }

    return await this.findProductById(newProduct.id);
  },
  async updateProductById(productId, productInfo) {
    const { title, href, description, categoryIds = [] } = productInfo;

    const updatedProduct = await Product.update({
      title,
      href,
      description,
    });

    if (updatedProduct[0] == 0)
      throw new createError.BadRequest("محصولی با این آیدی یافت نشد");

    if (categoryIds.length > 0) {
      await updatedProduct.setCategories(categories);
    } else {
      await updatedProduct.setCategories([]);
    }
    return await this.findProductById(newProduct.id);
  },
  async deleteProductById(id) {
    const product = await this.findProductById(id);

    if (!product) {
      throw createError.NotFound("محصولی با این آیدی یافت نشد");
    }

    await product.destroy();

    return product;
  },
  async getAllProduct(page = 1, limit = 10) {
    const count = await Product.count();
    const products = await Product.findAll({
      limit,
      offset: (page - 1) * limit,
      include: [
        { model: Category, as: "categories", through: { attributes: [] } },
      ],
    });

    return { count, products };
  },
};
