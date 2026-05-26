const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.get("/", categoryController.getCategories);
  fastify.post(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    categoryController.addCategory,
  );
  fastify.delete(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    categoryController.deleteCategory,
  );
  fastify.put(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    categoryController.updateCategory,
  );
}

module.exports = router;
