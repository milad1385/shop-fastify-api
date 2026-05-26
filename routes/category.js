const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    categoryController.addCategory,
  );
}

module.exports = router;
