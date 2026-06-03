const banController = require("../controllers/banController");
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: authMiddleware },
    basketController.addProductToBasket,
  );
  fastify.delete(
    "/:id",
    { preHandler: authMiddleware },
    basketController.deleteBasketItem,
  );
  fastify.delete(
    "/decrease/:id",
    { preHandler: authMiddleware },
    basketController.decreaseBasketItem,
  );
  fastify.delete(
    "/delete",
    { preHandler: authMiddleware },
    basketController.deleteAllBasket,
  );
}

module.exports = router;
