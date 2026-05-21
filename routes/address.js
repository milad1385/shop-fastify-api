const addressController = require("../controllers/addressController");
const authMiddleware = require("../middleware/authMiddleware");

function router(fastify, options) {
  fastify.post(
    "/",
    { preHandler: authMiddleware },
    addressController.addNewAddress,
  );
  fastify.delete(
    "/:id",
    { preHandler: authMiddleware },
    addressController.removeAddress,
  );
}

module.exports = router;
