const { User } = require("../models");

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

    return user;
  },
  async getUserByMobile(mobile) {
    const user = await User.findOne({ where: { mobile } });
    return user;
  },
};
