const Joi = require('joi');
// const { objectId } = require('./custom.validation');

const createPizza = {
  body: Joi.object({
    type: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  }),
};
module.exports = { createPizza };
