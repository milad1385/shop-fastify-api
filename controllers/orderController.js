const orderService = require("../services/orderService");

module.exports = {
  async addNewOrder(req, res) {
    const userId = req.user.id;
    const newOrder = await orderService.createOrder(userId);

    return res
      .status(201)
      .send({
        statusCode: 201,
        message: "سفارش کاربر با موفقیت ثبت شد",
        data: newOrder,
      });
  },
};
