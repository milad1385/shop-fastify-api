const fp = require("fastify-plugin");
const createError = require("http-errors");
const Joi = require("joi");

async function validatorPlugin(fastify, option) {
  fastify.decorate("validate", (schema, data) => {
    const { error } = schema.validate(data);

    if (error) throw createError.BadRequest(error.details[0].message);
  });
}

module.exports = fp(validatorPlugin);
