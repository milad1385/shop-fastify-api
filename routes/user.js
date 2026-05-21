const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

function router(fastify, options) {
  fastify.post("/register", userController.register);
  fastify.post("/login", userController.login);
  fastify.get("/me", { preHandler: authMiddleware }, userController.getMe);
}

module.exports = router;
