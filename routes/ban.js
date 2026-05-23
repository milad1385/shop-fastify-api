const banController = require("../controllers/banController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.get(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    banController.createBanUser,
  );
}

module.exports = router;
