async function isAdmin(req, res) {
  try {
    const user = req.user;

    if (!user)
      return res
        .status(401)
        .send({ statusCode: 401, message: "لطفا لاگین کنید" });

    if (user.role !== "admin") {
      return res.status(403).send({
        statusCode: 403,
        message: "این مسیر فقط برای ادمین ها می باشد.",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ message: "لطفا لاگین کنید", statusCode: 401 });
  }
}

module.exports = isAdmin;
