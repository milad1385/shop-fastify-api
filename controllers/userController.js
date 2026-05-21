const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
        statusCode: 201,
        message: "ورود با موفقیت انجام شد",
        data: { token },
      });
    } catch (error) {
      return res
        .status(500)
        .send({ statusCode: 500, message: "خطا وجود دارد", error });
    }
  },
};
