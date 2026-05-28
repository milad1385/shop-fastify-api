const { Seller } = require("../models");

module.exports = {
  async findSellerByUserId(id) {
    const seller = await Seller.findOne({ where: { user_id: id } });
    return seller;
  },
  async findSellerById(id) {
    const seller = await Seller.findOne({ where: { id } });
    return seller;
  },
  async createSeller(sellerInfo, userId) {
    const seller = await this.findSellerByUserId(userId);
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
  async deleteSellerById(id) {
    const seller = await this.findSellerById(id);
    if (!seller) {
      throw createError.BadRequest("فروشنده ای با این آیدی وجود دارد");
    }
    await Seller.destroy({ where: { id } });
    return seller;
  },
  async updateSellerById(sellerId, userId, sellerInfo) {
    const seller = await this.findSellerById(sellerId);
    if (!seller) {
      throw createError.BadRequest("فروشنده ای با این آیدی وجود ندارد");
    }

    if (seller.user_id !== userId) {
      throw createError.Forbidden("این فروشنده برای شخص دیگری می باشد");
    }

    const { name, phone, email, postal_code, province, city } = sellerInfo;
    const newSeller = await Seller.update(
      {
        name,
        phone,
        email,
        postal_code,
        province,
        city,
        user_id: userId,
      },
      { where: { sellerId } },
    );

    return await Seller.findOne({ where: { sellerId } });
  },
};
