const { Op } = require("sequelize");
const { Menu } = require("../models");
const createError = require("http-errors");

module.exports = {
  async findMenuByTitleAndTitle(title, href) {
    const menu = await Menu.findOne({
      where: { [Op.or]: [{ title }, { href }] },
    });
    return menu;
  },
  async createNewMenu(menuData) {
    const { title, href, parentId } = menuData;
    const menu = await this.findMenuByTitleAndTitle(title, href);
    if (menu) {
      throw createError.BadRequest("منو با این مشخصات وجود دارد");
    }

    const newMenu = await Menu.create({ title, href, parent_id: parentId });

    return await this.findMenuByTitleAndTitle(title, href);
  },
};
