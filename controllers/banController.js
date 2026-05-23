const banService = require("../services/banService");

module.exports = {
  async createBanUser(req, res) {
    const { userId, reason, days, hours, isPermanent } = req.body;
    const adminId = req.user.id;

    const banedUser = await banService.banUser(
      userId,
      adminId,
      reason,
      days,
      hours,
      isPermanent,
    );

    return res
      .status(201)
      .send({
        statusCode: 201,
        message: "کاربر مورد نظر بن شد",
        data: banedUser,
      });
  },
};
