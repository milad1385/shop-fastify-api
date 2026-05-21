const fastify = require("fastify")({ logger: true });
const userRouter = require("./routes/user");

fastify.register(
  async (fastify, options) => {
    fastify.register(userRouter, { prefix: "/user" });
  },
  { prefix: "/api/v1" },
);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("server is running on ports 3000");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
