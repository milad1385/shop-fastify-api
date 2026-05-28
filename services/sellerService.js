const createError = require("http-errors");
const { Seller } = require("../models");

module.exports = {
  async getSellerById(id) {
    const seller = await Seller.findOne({ where: { user_id: id } });
    return seller;
  },
  async createSeller(sellerInfo, userId) {
    const seller = await this.getSellerById(userId);
    if (seller) {
      throw createError.BadRequest("فروشنده ای با این آیدی وجود دارد");
    }

    const { name, phone, email, postal_code, province, city } = sellerInfo;
    const newSeller = await Seller.create({
      name,
      phone,
      email,
      postal_code,
      province,
      city,
      user_id: userId,
    });

    return newSeller;
  },
};
