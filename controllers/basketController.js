const basketService = require("../services/basketService");

module.exports = {
  async addProductToBasket(req, res) {
    const userId = req.user.id;
    const newBasket = await basketService.createBasket(userId, req.body);

    return res.status(201).send({
      statusCode: 201,
      message: "محصول با موفقیت در سبد خرید اضافه شد",
      data: newBasket,
    });
  },
};
