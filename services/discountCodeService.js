const createError = require("http-errors");
const { DiscountCode } = require("../models");

module.exports = {
  async findDiscountByCode(code) {
    return await DiscountCode.findOne({ where: { code } });
  },
  async createDiscountCode(discountCode) {
    const { code, capacity, off_percent } = discountCode;
    const discount = await this.findDiscountByCode(code);
    if (discount) {
      throw createError.BadRequest("کد تخفیف با این مشخصات وجود دارد");
    }

    const newDiscountCode = await DiscountCode.create({
      code,
      capacity,
      off_percent,
    });

    return newDiscountCode;
  },
};
