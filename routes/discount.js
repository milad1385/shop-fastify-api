const discountCodeController = require("../controllers/discountCodeController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.get(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    discountCodeController.getDiscounts,
  );
  fastify.post(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    discountCodeController.addDiscountCode,
  );
  fastify.delete(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    discountCodeController.deleteDiscountCode,
  );
}

module.exports = router;
