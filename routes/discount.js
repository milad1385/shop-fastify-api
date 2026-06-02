const discountCodeController = require("../controllers/discountCodeController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    discountCodeController.addDiscountCode,
  );
}

module.exports = router;
