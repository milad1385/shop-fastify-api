const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

function router(fastify, options) {
  fastify.post("/register", userController.register);
  fastify.post("/login", userController.login);
  fastify.get("/me", { preHandler: authMiddleware }, userController.getMe);
  fastify.get("/", { preHandler: authMiddleware }, userController.getAllUsers);
}

module.exports = router;
