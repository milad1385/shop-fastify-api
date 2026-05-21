const { User } = require("../models");

module.exports = {
  async createUser(name, username, mobile, password, email) {
    const user = await User.create({ name, username, mobile, password, email });

    return user;
  },
  async getUserByMobile(mobile) {
    const user = await User.findOne({ where: { mobile } });
    return user;
  },
};
