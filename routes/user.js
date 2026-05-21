const userController = require("../controllers/userController");

function router(fastify, options) {
  fastify.post("/register", userController.register);
  fastify.post("/login", userController.login);
}

module.exports = router;
