const banController = require("../controllers/banController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    banController.createBanUser,
  );
  fastify.delete(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    banController.unBanUser,
  );
}

module.exports = router;
