const fastify = require("fastify")({ logger: true });
const userRouter = require("./routes/user");
const addressRouter = require("./routes/address");
const banRouter = require("./routes/ban");
const categoryRouter = require("./routes/category");
const sellerRouter = require("./routes/seller");
const productRouter = require("./routes/product");
const commentRouter = require("./routes/comment");
const sequelize = require("./configs/db");
const validatorPlugin = require("./plugins/validator");
const dotenv = require("dotenv");

const isProductionMode = process.env.NODE_ENV === "production";
if (!isProductionMode) {
  dotenv.config();
}
fastify.register(validatorPlugin);

fastify.register(
  async (fastify, options) => {
    fastify.register(userRouter, { prefix: "/users" });
    fastify.register(addressRouter, { prefix: "/address" });
    fastify.register(banRouter, { prefix: "/ban" });
    fastify.register(categoryRouter, { prefix: "/category" });
    fastify.register(sellerRouter, { prefix: "/seller" });
    fastify.register(productRouter, { prefix: "/product" });
    fastify.register(commentRouter, { prefix: "/comment" });
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

fastify.setErrorHandler((error, request, reply) => {

  
  return reply.status(error.statusCode || 500).send({
    statusCode: error.statusCode || 500,
    message: `${error}` || "خطای داخلی سرور",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});
