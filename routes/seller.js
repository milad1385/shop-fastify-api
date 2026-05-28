const sellerController = require("../controllers/sellerController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: authMiddleware },
    sellerController.addNewSeller,
  );
  fastify.delete(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    sellerController.addNewSeller,
  );
}
