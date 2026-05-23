const { Ban, User } = require("../models");
const userService = require("./userService");
const createError = require("http-errors");

module.exports = {
  async banUser(
    userId,
    adminId,
    reason,
    days = 0,
    hours = 0,
    isPermanent = false,
  ) {
    let expiresAt = null;
    if (!isPermanent && (days > 0 || hours > 0)) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + days);
      expiresAt.setHours(expiresAt.getHours() + hours);
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      return createError.NotFound("کاربری با این آیدی یافت نشد");
    }

    const banedUser = await Ban.create({
      user_id: userId,
      banned_by_id: adminId,
      reason,
      expires_at: expiresAt,
      is_permanent: isPermanent,
    });

    return banedUser;
  },
};
