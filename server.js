const fastify = require("fastify")({ logger: true });
const userRouter = require("./routes/user");
const addressRouter = require("./routes/address");
const sequelize = require("./configs/db");

fastify.register(
  async (fastify, options) => {
    fastify.register(userRouter, { prefix: "/users" });
    fastify.register(addressRouter, { prefix: "/address" });
  },
  { prefix: "/api/v1" },
);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    await sequelize.sync({ alter: true });
    console.log("server is running on ports 3000");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
