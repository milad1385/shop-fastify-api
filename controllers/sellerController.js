const sellerService = require("../services/sellerService");

module.exports = {
  async addNewSeller(req, res) {
    const userId = req.user.id;
    const newSeller = await sellerService.getSellerById(userId);

    return res.status(200).send({
      statusCode: 200,
      message: "فروشنده با موفقیت ساخته شد",
      data: newSeller,
    });
  },
};
