const discountCodeController = require("../controllers/discountCodeController");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.get(
    "/",
    { preHandler: authMiddleware },
    orderController.getUserOrders,
  );
  fastify.get(
    "/all",
    { preHandler: [authMiddleware, isAdmin] },
    orderController.getAllOrders,
  );
  fastify.get(
    "/:id",
    { preHandler: authMiddleware },
    orderController.getOrder,
  );
  fastify.post(
    "/",
    { preHandler: authMiddleware },
    orderController.addNewOrder,
  );
}

module.exports = router;
