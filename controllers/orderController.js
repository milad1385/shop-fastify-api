const orderService = require("../services/orderService");
const { createPagination } = require("../utils/func");

module.exports = {
  async addNewOrder(req, res) {
    const userId = req.user.id;
    const newOrder = await orderService.createOrder(userId);

    return res.status(201).send({
      statusCode: 201,
      message: "سفارش کاربر با موفقیت ثبت شد",
      data: newOrder,
    });
  },
  async getUserOrders(req, res) {
    let { page, limit, status } = req.query;
    page = +page || 1;
    limit = +limit || 10;
    const userId = req.user.id;
    const { orders, count } = await orderService.getUserOrdersById(
      userId,
      status,
      page,
      limit,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "سفارشات کاربر با موفقیت دریافت شد",
      data: {
        orders,
        pagination: createPagination(page, limit, count, "Orders"),
      },
    });
  },
};
