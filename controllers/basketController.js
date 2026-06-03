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
  async deleteBasketItem(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedBasket = await basketService.deleteBasketItemById(userId, id);

    return res.status(200).send({
      statusCode: 200,
      message: "محصول با موفقیت از سبد خرید حذف شد",
      data: deletedBasket,
    });
  },

  async decreaseBasketItem(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedBasket = await basketService.decreaseBasketItemQtyById(
      userId,
      id,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "تعداد محصول از سبد کم شد",
      data: updatedBasket,
    });
  },
};
