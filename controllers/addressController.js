const addressService = require("../services/addressService");

module.exports = {
  async addNewAddress(req, res) {
    const userId = req.user.id;
    try {
      const address = await addressService.addAddress(req.body, userId);

      return res.status(201).send({
        statusCode: 201,
        message: "آدرس با موفقیت ساخته شد",
        data: address,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ statusCode: 500, message: "خطا وجود دارد", error });
    }
  },
  async removeAddress(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const deletedAddress = await addressService.deleteAddressById(id, userId);
      return res.status(200).send({
        statusCode: 200,
        message: "آدرس با موفقیت حذف شد",
        data: deletedAddress,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ statusCode: 500, message: "خطا وجود دارد", error });
    }
  },
};
