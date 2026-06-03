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
};
