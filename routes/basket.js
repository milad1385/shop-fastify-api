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
}

module.exports = router;
