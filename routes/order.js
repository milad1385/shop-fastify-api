const discountCodeController = require("../controllers/discountCodeController");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: authMiddleware },
    orderController.addNewOrder,
  );
}

module.exports = router;
