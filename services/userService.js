const { User, Wallet } = require("../models");
const createError = require("http-errors");
module.exports = {
  async createUser(name, username, mobile, password, email) {
    const userCount = await User.count();
    const user = await User.create({
      name,
      username,
      mobile,
      password,
      email,
      role: userCount > 0 ? "user" : "admin",
    });

    await Wallet.create({
      user_id: user.id,
    });

    return user;
  },
  async getUserByMobile(mobile) {
    const user = await User.findOne({ where: { mobile } });
    return user;
  },
  async getUserById(id) {
    const user = await User.findOne({ where: { id } });
    return user;
  },
  async getUsers(page = 1, limit = 10) {
    const count = await User.count();
    const users = await User.findAll({ limit, offset: (page - 1) * limit });
    return { count, users };
  },
  async deleteUserById(id) {
    const user = await this.getUserById(id);

    if (!user) {
      throw createError.NotFound("کاربری با این آیدی یافت نشد");
    }

    await user.destroy();

    return user;
  },
};
