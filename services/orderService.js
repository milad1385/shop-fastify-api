const createError = require("http-errors");
const basketService = require("./basketService");
const {
  ProductSeller,
  Order,
  OrderItem,
  Product,
  Basket,
  User,
  Seller,
  DiscountCode,
} = require("../models");

module.exports = {
  async findOrderById(id) {
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: OrderItem,
          as: "order_items",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    return order;
  },
  async getUserOrdersById(userId, status = "all", page = 1, limit = 10) {
    let where = { user_id: userId };
    if (status !== "all") {
      where.status = status;
    }

    const count = await Order.count({ where });
    const orders = await Order.findAll({
      where,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "username", "mobile", "avatar"],
        },
        {
          model: OrderItem,
          as: "order_items",
          include: [
            {
              model: Seller,
              as: "seller",
              attributes: ["name", "phone", "province", "city"],
            },
            {
              model: Product,
              as: "product",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return { count, orders };
  },
  async findAllOrders(status = "all", page = 1, limit = 10) {
    let where = {};
    if (status !== "all") {
      where.status = status;
    }

    const count = await Order.count({ where });
    const orders = await Order.findAll({
      where,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "username", "mobile", "avatar"],
        },
        {
          model: OrderItem,
          as: "order_items",
          include: [
            {
              model: Seller,
              as: "seller",
              attributes: ["name", "phone", "province", "city"],
            },
            {
              model: Product,
              as: "product",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return { count, orders };
  },
  async findOneOrder(orderId, user) {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "username", "mobile", "avatar"],
        },
        {
          model: OrderItem,
          as: "order_items",
          include: [
            {
              model: Seller,
              as: "seller",
              attributes: ["name", "phone", "province", "city"],
            },
            {
              model: Product,
              as: "product",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
    });

    const isAuthorized = user.role === "admin" || user.id === order.user_id;

    if (!isAuthorized) {
      throw createError.Forbidden("این سفارش متعلق به شما نیست");
    }

    return order;
  },
  async applyDiscountCodeOnOrder(code, orderId) {
    const discountCode = await DiscountCode.findOne({ where: { code } });
    if (!discountCode) {
      throw createError.BadRequest("کد وارد شده نامعتبر است");
    }
    if (discountCode.status !== "enable") {
      throw createError.BadRequest("کد تخفیف وارد شده منقضی شده است");
    }
    if (discountCode.capacity === 0) {
      throw createError.BadRequest("ظرفیت کد تخفیف به پایان رسیده است");
    }

    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) throw createError.BadRequest("سفارش وارد شده نامعتبر است");

    if (order.discount_code) {
      throw createError.BadRequest("کد تخفیف قبلا ثبت شده است");
    }

    // apply code
    const finalPrice = (order.total_price * discountCode.off_percent) / 100;

    await order.update({
      price_discount_code: finalPrice,
      discount_code: discountCode.code,
    });
    const orderApplyDiscount = await Order.findOne({ where: { id: order.id } });

    await DiscountCode.decrement("capacity", {
      by: 1,
      where: { id: discountCode.id },
    });

    return orderApplyDiscount;
  },
  async createOrder(userId) {
    const basketItems = await basketService.findAllBasketByUserId(userId);
    if (!basketItems.length) {
      throw createError.NotFound("محصولی در سبد خرید شما وجود ندارد");
    }

    let total_price = 0;
    let total_discount = 0;
    for (basketItem of basketItems) {
      total_price +=
        (basketItem.price - (basketItem.price * basketItem.discount) / 100) *
        basketItem.quantity;
      total_discount +=
        ((basketItem.price * basketItem.discount) / 100) * basketItem.quantity;
    }

    const order = await Order.create({
      user_id: userId,
      total_price,
      final_price: total_price,
      seller_discount: total_discount,
    });

    for (basketItem of basketItems) {
      await OrderItem.create({
        order_id: order.id,
        product_id: basketItem.product_id,
        quantity: basketItem.quantity,
        price: basketItem.price,
        discount: basketItem.discount,
        seller_id: basketItem.seller.seller_id,
      });
      await Basket.destroy({ where: { id: basketItem.id } });
    }

    const currentOrder = await this.findOrderById(order.id);

    return currentOrder;
  },
  async createPaymentRequest(orderId) {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [{ model: User, as: "user" }],
    });
    if (!order) throw new createError.BadRequest("سفارش وارد شده نامعتبر است");

    let amount = order.final_price;
    if (order.price_discount_code) {
      amount = order.final_price - order.price_discount_code;
    }

    const res = await fetch(`${process.env.ZIBAL_BASE_URL}/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant: process.env.ZIBAL_MERCHANT_ID,
        amount: amount * 10,
        orderId: order.id,
        mobile: order.user.mobile,
        callbackUrl: "http://localhost:3000",
      }),
    });

    const data = await res.json();

    return data.trackId;
  },
  async verifyPayment(trackId, orderId, addressId) {
    const res = await fetch(`${process.env.ZIBAL_BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trackId,
        merchant: process.env.ZIBAL_MERCHANT_ID,
      }),
    });

    const verifyData = await res.json();
    const timeNow = new Date().toISOString().slice(0, 19).replace("T", " ");

    if (verifyData.result.include([100, 201])) {
      await Order.update(
        {
          paid_time: timeNow,
          status: "paid",
          address_id: addressId,
        },
        { where: { id: orderId, status: "pending" } },
      );

      return verifyData;
    } else {
      await Order.update(
        { status: "cancel" },
        { where: { id: orderId, status: "pending" } },
      );
      throw createError.BadRequest("پرداخت با موفقیت انجام نشد");
    }
  },
};
