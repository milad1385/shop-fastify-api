const { Address } = require("../models");
const createError = require("http-errors");
module.exports = {
  async findAddressById(id) {
    const address = await Address.findOne({ where: { id } });
    return address;
  },
  async addAddress(addressInfo, userId) {
    const {
      province,
      city,
      address,
      postal_code,
      receiver_mobile,
      description,
    } = addressInfo;

    const newAddress = await Address.create({
      province,
      city,
      address,
      postal_code,
      receiver_mobile,
      description,
      user_id: userId,
    });

    return newAddress;
  },

  async deleteAddressById(id, userId) {
    const address = await this.findAddressById(id);
    if (!address) {
      throw createError.NotFound("آدرسی با این آیدی پیدا نشد");
    }
    if (address.user_id !== userId) {
      throw createError.Forbidden("این آدرس برای شخص دیگری می باشد");
    }
    const deletedAddress = await Address.destroy({ where: { id } });

    return deletedAddress;
  },
};
