const sellerService = require("../services/sellerService");
const { createPagination } = require("../utils/func");

module.exports = {
  async addNewSeller(req, res) {
    const userId = req.user.id;
    const newSeller = await sellerService.getSellerById(userId);

    return res.status(201).send({
      statusCode: 201,
      message: "فروشنده با موفقیت ساخته شد",
      data: newSeller,
    });
  },
  async deleteSeller(req, res) {
    const { id } = req.params;

    const deletedSeller = await sellerService.deleteSellerById(id);
    return res.status(200).send({
      statusCode: 200,
      message: "فروشنده با موفقیت حذف شد",
      data: deletedSeller,
    });
  },
  async updateSeller(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedSeller = await sellerService.updateSellerById(
      id,
      userId,
      req.body,
    );
    return res.status(200).send({
      statusCode: 200,
      message: "فروشنده با موفقیت آپدیت شد",
      data: newSeller,
    });
  },
  async getAllSeller(req, res) {
    let { page, limit } = req.query;
    page = +page || 1;
    limit = +limit || 10;

    const { sellers, count } = await sellerService.getSellers(page, limit);

    return res.status(200).send({
      statusCode: 200,
      message: "لیست فروشندگان",
      data: users,
      pagination: createPagination(page, limit, count, "Sellers"),
    });
  },
  async getProductSellers(req, res) {
    const { id } = req.params;
    const sellers = await sellerService.getProductSellers(id);

    return res.status(200).send({
      statusCode: 200,
      message: "تمام فروشنده های محصول دریافت شد",
      data: sellers,
    });
  },
  async changeSellerStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const updatedSeller = await sellerService.changeSellerStatusById(
      id,
      status,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "وضعیت فروشنده با موفقیت تغییر کرد",
      data: updatedSeller,
    });
  },
};
