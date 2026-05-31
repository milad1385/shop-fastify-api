const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.get(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    commentController.getComments,
  );
  fastify.post(
    "/",
    { preHandler: authMiddleware },
    commentController.addNewComment,
  );
}

module.exports = router;
