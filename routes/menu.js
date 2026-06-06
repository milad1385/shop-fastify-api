const discountCodeController = require("../controllers/discountCodeController");
const menuController = require("../controllers/menuController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    menuController.addNewMenu,
  );
  fastify.delete(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    menuController.deleteMenu,
  );
  fastify.get(
    "/all",
    { preHandler: [authMiddleware, isAdmin] },
    menuController.findAllMenus,
  );
  fastify.get("/", menuController.findMenus);
}

module.exports = router;
