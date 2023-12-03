const httpStatus = require('http-status');
const validateSchema = require('../middlewares/validate');
require('express-async-errors');

const authValidation = require('../validations/auth.validation');

const authService = require('../services/auth.service');

const login = async (req, res) => {
  validateSchema(req, authValidation.login);

  const { email, password } = req.body;

  const { user, token } = await authService.login({ email, password });
  res
    .status(httpStatus.CREATED)
    .send({ status: true, message: 'fetched successfully', data: user, token });
};

const signup = async (req, res) => {
  validateSchema(req, authValidation.signup);

  const { name, email, password, address } = req.body;

  const { user, token } = await authService.signup({
    name,
    email,
    password,
    address,
  });
  res
    .status(httpStatus.CREATED)
    .send({ status: true, message: 'fetched successfully', data: user, token });
};

module.exports = {
  login,
  signup,
};
