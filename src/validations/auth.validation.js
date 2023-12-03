const Joi = require('joi');
const { email } = require('./custom.validation');

const login = {
  body: Joi.object({
    email: Joi.string().required().custom(email),
    password: Joi.string().required(),
  }),
};

const signup = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().custom(email),
    password: Joi.string().required(),
    address: Joi.string().required(),
  }),
};

module.exports = {
  login,
  signup,
};
