const createError = require("http-errors");
const { Seller, User } = require("../models");

module.exports = {
  async findSellerByUserId(id) {
    const seller = await Seller.findOne({ where: { user_id: id } });
    return seller;
  },
  async findSellerById(id) {
    const seller = await Seller.findOne({ where: { id } });
    return seller;
  },
  async getSellers(page = 1, limit = 10) {
    const count = await Seller.count();
    const sellers = await Seller.findAll({
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    return { count, sellers };
  },
  async getProductSellers(productId) {
    const sellers = await Seller.findAll({
      where: { product_id: productId },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    return sellers;
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
  async changeSellerStatusById(sellerId, status) {
    const seller = await this.findSellerById(sellerId);

    if (!seller) {
      throw createError.NotFound("فروشنده ای با این ایدی یافت نشد");
    }

    await seller.update({ status });

    return await this.findSellerById(sellerId);
  },
};
