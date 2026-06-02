const discountCodeService = require("../services/discountCodeService");
const { createPagination } = require("../utils/func");

module.exports = {
  async getDiscounts(req, res) {
    let { page, limit } = req.query;
    page = +page || 1;
    limit = +limit || 10;
    const { count, discounts } = await discountCodeService.findAllDiscount(
      page,
      limit,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "لیست کد های تخفیف با موفقیت دریافت شد",
      data: {
        discounts,
        pagination: createPagination(page, limit, count, "Discount"),
      },
    });
  },
  async addDiscountCode(req, res) {
    const newDiscount = await discountCodeService.createDiscountCode(req.body);
    return res.status(201).send({
      statusCode: 201,
      message: "کد تخفیف با موفقیت ایجاد شد",
      data: newDiscount,
    });
  },
  async deleteDiscountCode(req, res) {
    const { id } = req.params;
    const deletedDiscountCode =
      await discountCodeService.deleteDiscountCodeById(id);

    return res.status(200).send({
      statusCode: 200,
      message: "کد تخفیف با موفقیت حذف شد",
      data: deletedDiscountCode,
    });
  },
};
