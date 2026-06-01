const bookmarkController = require("../controllers/bookmarkController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.get(
    "/",
    { preHandler: authMiddleware },
    bookmarkController.getUserBookmarks,
  );
  fastify.post(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    bookmarkController.addBookmark,
  );
}

module.exports = router;
