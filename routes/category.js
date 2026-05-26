const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    categoryController.addCategory,
  );
  fastify.delete(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    categoryController.deleteCategory,
  );
}

module.exports = router;
