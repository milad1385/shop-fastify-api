const jwt = require("jsonwebtoken");
const { User, Wallet } = require("../models");
const createError = require("http-errors");
const { calculateRemainingBanTime } = require("../utils/func");
const banService = require("../services/banService");

async function authMiddleware(req, res) {
  try {
    let token = req.headers.authorization;

    if (!token) throw createError.Unauthorized("لطفا توکن را وارد کنید");

    token = token.split(" ")[1];

    // token validation
    const decoded = jwt.verify(token, "secretkey");

    const user = await User.findOne({
      where: { id: decoded.id },
      include: [
        { model: Wallet, as: "wallet", attributes: { exclude: ["user_id"] } },
      ],
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw createError.NotFound("کاربری با این اطلاعات یافت نشد");
    }

    const activeBan = await banService.findBanByUserId(user.id);

    if (activeBan) {
      const banMessage = calculateRemainingBanTime(
        activeBan.is_permanent,
        activeBan.expires_at,
      );

      throw createError.Forbidden(banMessage);
    }

    req.user = user;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw createError.Unauthorized("توکن نامعتبر می باشد");
    }

    if (error.name === "TokenExpiredError") {
      throw createError.Unauthorized("توکن منقضی شده است");
    }

    throw error;
  }
}

module.exports = authMiddleware;
