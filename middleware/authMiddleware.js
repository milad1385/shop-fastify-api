const jwt = require("jsonwebtoken");
const { User, Wallet } = require("../models");

async function authMiddleware(req, res) {
  try {
    let token = req.headers.authorization;

    if (!token)
      return res
        .status(401)
        .send({ statusCode: 401, message: "لطفا توکن را وارد کنید" });

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

    req.user = user;
  } catch (error) {
    return res
      .status(401)
      .send({ message: "توکن نامعتبر می باشد", statusCode: 401 });
  }
}

module.exports = authMiddleware;
