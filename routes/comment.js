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
    "/user",
    { preHandler: authMiddleware },
    commentController.getUserComments,
  );
  fastify.get(
    "/product/:id",
    { preHandler: authMiddleware },
    commentController.getProductComments,
  );

  fastify.patch(
    "/:id",
    { preHandler: [authMiddleware, isAdmin] },
    commentController.changeCommentStatus,
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

  fastify.patch(
    "/update/:id",
    { preHandler: [authMiddleware, isAdmin] },
    commentController.updateComment,
  );
}

module.exports = router;
