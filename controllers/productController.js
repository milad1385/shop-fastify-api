const productService = require("../services/productService");
const { createPagination } = require("../utils/func");

module.exports = {
  async addNewProduct(req, res) {
    const newProduct = await productService.createNewProduct(req.body);
    return res.status(201).send({
      statusCode: 201,
      message: " محصول جدید با موفقیت ساخته شد",
      data: newProduct,
    });
  },
  async updateProduct(req, res) {
    const { id } = req.params;
    const updatedProduct = await productService.updateProductById(id, req.body);

    return res.status(200).send({
      statusCode: 200,
      message: " محصول جدید با موفقیت آپدیت شد",
      data: updatedProduct,
    });
  },
  async deleteProduct(req, res) {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProductById(id);

    return res.status(200).send({
      statusCode: 200,
      message: "محصول با موفقیت حذف شد",
      data: deletedProduct,
    });
  },
  async getAllProduct(req, res) {
    let { page, limit } = req.query;
    page = +page || 1;
    limit = +limit || 10;
    const { count, products } = await productService.getAllProduct(page, limit);

    return res.status(200).send({
      statusCode: 200,
      message: "محصولات با موفقیت گرفته شد",
      data: {
        products,
        pagination: createPagination(page, limit, count, "Products"),
      },
    });
  },
  async getOneProduct(req, res) {
    const { id } = params;

    const product = await productService.findProductById(id);

    return res
      .status(200)
      .send({
        statusCode: 200,
        message: "محصول  با موفقیت گرفته شد",
        data: product,
      });
  },
};
