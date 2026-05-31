const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.get(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    commentController.getComments,
  );
  fastify.get(
    "/product/:id",
    { preHandler: [authMiddleware, isAdmin] },
    commentController.getProductComments,
  );
  fastify.post(
    "/",
    { preHandler: authMiddleware },
    commentController.addNewComment,
  );
  fastify.delete(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    commentController.deleteComment,
  );
}

module.exports = router;
