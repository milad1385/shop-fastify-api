const menuService = require("../services/menuService");

module.exports = {
  async addNewMenu(req, res) {
    const menu = await menuService.createNewMenu(req.body);

    return res
      .status(201)
      .send({ statusCode: 201, message: "منو با موفقیت ساخته شد", data: menu });
  },
  
};
