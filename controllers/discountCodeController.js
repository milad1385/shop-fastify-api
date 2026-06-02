const discountCodeService = require("../services/discountCodeService");

module.exports = {
  async addDiscountCode(req, res) {
    const newDiscount = await discountCodeService.createDiscountCode(req.body);
    return res.status(201).send({
      statusCode: 201,
      message: "کد تخفیف با موفقیت ایجاد شد",
      data: newDiscount,
    });
  },
};
