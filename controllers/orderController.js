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
  async getAllOrders(req, res) {
    let { page, limit, status } = req.query;
    page = +page || 1;
    limit = +limit || 10;

    const { orders, count } = await orderService.findAllOrders(
      status,
      page,
      limit,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "سفارشات با موفقیت دریافت شد",
      data: {
        orders,
        pagination: createPagination(page, limit, count, "Orders"),
      },
    });
  },
  async getOrder(req, res) {
    const { id } = req.params;
    const user = req.user;

    const order = await orderService.findOneOrder(id, user);

    return res.status(200).send({
      statusCode: 200,
      message: "اطلاعات سفارش دریافت شد",
      data: order,
    });
  },
  async applyDiscount(req, res) {
    const { code, orderId } = req.body;

    const discount = await orderService.applyDiscountCodeOnOrder(code, orderId);

    return res.status(200).send({
      statusCode: 200,
      message: "تخفیف با موفقیت اعمال شد",
      data: discount,
    });
  },
  async paymentOrder(req, res) {
    const { orderId } = req.body;

    const trackId = await orderService.createPaymentRequest(orderId);

    return res.status(200).send({
      statusCode: 200,
      message: "لینک پرداخت با موفقیت ساخته شد",
      data: {
        trackId,
        paymentUrl: `${process.env.ZIBAL_URL}/start/${trackId}`,
      },
    });
  },
  async verifyPayment(req, res) {
    const { trackId, orderId, addressId } = req.body;

    const verify = await orderService.verifyPayment(trackId, orderId , addressId);

    return res.status(200).send({
      statusCode: 200,
      message: "پرداخت با موفقیت انجام شد",
      data: verify,
    });
  },
};
