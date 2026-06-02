const createError = require("http-errors");
const { DiscountCode } = require("../models");

module.exports = {
  async findDiscountByCode(code) {
    return await DiscountCode.findOne({ where: { code } });
  },
  async findAllDiscount(page = 1, limit = 10) {
    const count = await DiscountCode.count({});
    const discounts = await DiscountCode.findAll({
      limit,
      offset: (page - 1) * limit,
    });

    return { count, discounts };
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
  async deleteDiscountCodeById(id) {
    const discount = await this.findDiscountByCode(code);
    if (!discount) {
      throw createError.BadRequest("کد تخفیف با این مشخصات وجود ندارد");
    }

    await discount.destroy({});

    return discount;
  },
};
