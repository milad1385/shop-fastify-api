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

    return res.status(201).send({
      statusCode: 201,
      message: "کاربر مورد نظر بن شد",
      data: banedUser,
    });
  },
  async unBanUser(req, res) {
    const { userId } = req.body;
    const unBanedUser = await banService.unBanUserById(userId);

    return res.status(200).send({
      statusCode: 200,
      message: "کاربر از بن لیست حذف شد",
      data: unBanedUser,
    });
  },
};
