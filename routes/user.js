const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

function router(fastify, options) {
  fastify.post("/register", userController.register);
  fastify.post("/login", userController.login);
  fastify.get("/me", { preHandler: authMiddleware }, userController.getMe);
  fastify.get(
    "/",
    { preHandler: [authMiddleware, isAdmin] },
    userController.getAllUsers,
  );
}

module.exports = router;
