const discountCodeController = require("../controllers/discountCodeController");
const menuController = require("../controllers/menuController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.get(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    menuController.addNewMenu,
  );
}

module.exports = router;
