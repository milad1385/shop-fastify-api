const sellerService = require("../services/sellerService");
const { createPagination } = require("../utils/func");

module.exports = {
  async addNewSeller(req, res) {
    const userId = req.user.id;
    const newSeller = await sellerService.createSeller(userId, req.body);

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
      data: sellers,
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
  async addNewSellerRequest(req, res) {
    const userId = req.user.id;
    const newRequest = await sellerService.createNewSellerRequest(
      userId,
      req.body,
    );

    return res.status(201).send({
      statusCode: 201,
      message: "درخواست فروشنده با موفقیت ثبت شد",
      data: newRequest,
    });
  },
  async changeSellerRequestStatus(req, res) {
    const { id } = req.params;
    const { status, adminComment } = req.body;
    const sellerRequest = await sellerService.changeSellerRequestStatusById(
      id,
      status,
      adminComment,
    );

    return res.status(200).send({
      statusCode: 200,
      message: `محصول با موفقیت برای فروشنده ${sellerRequest ? "تایید" : "رد"} شد`,
      data: sellerRequest,
    });
  },
};
