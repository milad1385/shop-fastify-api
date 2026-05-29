const sellerController = require("../controllers/sellerController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: authMiddleware },
    sellerController.addNewSeller,
  );
  fastify.post(
    "/request",
    { preHandler: authMiddleware },
    sellerController.addNewSellerRequest,
  );
  fastify.delete(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    sellerController.addNewSeller,
  );
  fastify.put(
    "/:id",
    { preHandler: authMiddleware },
    sellerController.updateSeller,
  );

  fastify.patch(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    sellerController.changeSellerStatus,
  );

  fastify.get(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    sellerController.getAllSeller,
  );
  fastify.get("/product/:id", sellerController.getProductSellers);
}

module.exports = router;
