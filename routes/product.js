const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    productController.addNewProduct,
  );

  fastify.delete(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    productController.deleteProduct,
  );

  fastify.put(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    productController.updateProduct,
  );

  fastify.delete(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    productController.deleteProduct,
  );

  fastify.get("/", productController.getAllProduct);
  fastify.get("/:id", productController.getOneProduct);
}

module.exports = router;
