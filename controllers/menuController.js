const menuService = require("../services/menuService");
const { createPagination } = require("../utils/func");

module.exports = {
  async addNewMenu(req, res) {
    const menu = await menuService.createNewMenu(req.body);

    return res
      .status(201)
      .send({ statusCode: 201, message: "منو با موفقیت ساخته شد", data: menu });
  },
  async deleteMenu(req, res) {
    const { id } = req.params;
    const deletedMenu = await menuService.deleteMenuById(id);

    return res.status(200).send({
      statusCode: 200,
      message: "منو با موفقیت حذف شد",
      data: deletedMenu,
    });
  },
  async updateMenu(req, res) {
    const { id } = req.params;
    const updatedMenu = await menuService.updateMenuById(id, req.body);

    return res.status(200).send({
      statusCode: 200,
      message: "منو با موفقیت آپدیت شد",
      data: updatedMenu,
    });
  },
  async findAllMenus(req, res) {
    let { page, limit } = req.query;
    page = +page || 1;
    limit = +limit || 10;
    const { count, menus } = await menuService.findAllMenus(page, limit);

    return res.status(200).send({
      statusCode: 200,
      message: "منو ها با موفقیت دریافت شد",
      data: {
        menus,
        pagination: createPagination(page, limit, count, "Menus"),
      },
    });
  },
  async findMenus(req, res) {
    const menus = await menuService.findMenus();

    return res.status(200).send({
      statusCode: 200,
      message: "منو ها با موفقیت دریافت شد",
      data: menus,
    });
  },
};
