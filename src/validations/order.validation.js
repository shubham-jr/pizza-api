const Joi = require('joi');
// const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object({
    userId: Joi.number().required(),
    pizzaId: Joi.number().required(),
    quantity: Joi.number().required(),
    address: Joi.string().required(),
  }),
};

const updateOrder = {
  body: Joi.object({
    status: Joi.string(),
  }),
};

module.exports = { createOrder, updateOrder };
