const addressService = require("../services/addressService");

module.exports = {
  async addNewAddress(req, res) {
    const userId = req.user.id;
    const address = await addressService.addAddress(req.body, userId);

    return res.status(201).send({
      statusCode: 201,
      message: "آدرس با موفقیت ساخته شد",
      data: address,
    });
  },
  async removeAddress(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedAddress = await addressService.deleteAddressById(id, userId);
    return res.status(200).send({
      statusCode: 200,
      message: "آدرس با موفقیت حذف شد",
      data: deletedAddress,
    });
  },
  async updateAddress(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedAdress = await addressService.updateAddressById(
      id,
      userId,
      req.body,
    );

    return res.status(200).send({
      statusCode: 200,
      message: "آدرس با موفقیت آپدیت شد",
      data: updatedAdress,
    });
  },
};
