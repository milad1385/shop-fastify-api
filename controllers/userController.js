const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createPagination } = require("../utils/func");
module.exports = {
  async register(req, res) {
    const { name, username, mobile, password, email } = req.body;
    try {
      const existUser = await userService.getUserByMobile(mobile);
      if (existUser)
        return res.status(400).send({
          statusCode: 400,
          message: `کاربری با این شما موبایل وجود دارد`,
        });

      const user = await userService.createUser(
        name,
        username,
        mobile,
        password,
        email,
      );

      const token = jwt.sign(
        { id: user.id, name: user.name, mobile: user.mobile },
        "secretkey",
        { expiresIn: "1d" },
      );

      res.status(201).send({
        statusCode: 201,
        message: "ثبت نام شما با موفقیت انجام شد",
        data: { token },
      });
    } catch (error) {
      return res
        .status(500)
        .send({ statusCode: 500, message: "خطا وجود دارد", error });
    }
  },
  async login(req, res) {
    const { mobile, password } = req.body;

    try {
      const user = await userService.getUserByMobile(mobile);
      if (!user)
        return res.status(400).send({
          statusCode: 400,
          message: `شماره موبایل وارد شده اشتباه است!`,
        });

      const isMatchPassword = await bcrypt.compare(password, user.password);

      if (!isMatchPassword)
        return res
          .status(400)
          .send({ statusCode: 400, message: `اطلاعات وارد شده درست نیست` });
      const token = jwt.sign(
        { id: user.id, name: user.name, mobile: user.mobile },
        "secretkey",
        { expiresIn: "1d" },
      );

      return res.status(200).send({
        statusCode: 200,
        message: "ورود با موفقیت انجام شد",
        data: { token },
      });
    } catch (error) {
      return res
        .status(500)
        .send({ statusCode: 500, message: "خطا وجود دارد", error });
    }
  },
  async getMe(req, res) {
    const user = req.user;

    return res
      .status(200)
      .send({ statusCode: 200, message: "اطلاعات شما", data: user });
  },
  async getAllUsers(req, res) {
    let { page, limit } = req.query;
    page = +page || 1;
    limit = +limit || 10;

    const { users, count } = await userService.getUsers(page, limit);
    console.log(createPagination(page, limit, count, "users"));

    return res.status(200).send({
      statusCode: 200,
      message: "لیست کاربران",
      data: users,
      pagination: createPagination(page, limit, count, "Users"),
    });
  },
  async deleteUser(req, res) {
    const { id } = req.params;

    const deletedUser = await userService.deleteUserById(id);
    return res
      .status(200)
      .send({ statusCode: 200, message: "کاربر حذف شد", data: deletedUser });
  },
  async updateUser(req, res) {
    const { id } = req.params;

    const updatedUser = await userService.updateUserById(id, req.body);

    return res.status(200).send({
      statusCode: 200,
      message: "کاربر مورد نظر آپدیت شد",
      data: updatedUser,
    });
  },
  async chargeWallet(req, res) {
    const { amount, userId } = req.body;
    const paymentData = await userService.paymentChargingWallet(amount, userId);
    return res.status(200).send({
      statusCode: 200,
      message: "لینک درگاه پرداخت با موفقیت ساخته شد",
      data: {
        ...paymentData,
        url: `${process.env.ZIBAL_URL}/start/${paymentData.trackId}`,
      },
    });
  },
  async verifyWallet(req, res) {
    const { trackId } = req.body;
    const verifyData = await userService.verifyChargingWallet(trackId);

    return res
      .status(200)
      .send({ statusCode: 200, message: "درخواست کاربر با موفقیت پردازش شد", data: verifyData });
  },
};
