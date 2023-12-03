const httpStatus = require('http-status');
const validateSchema = require('../middlewares/validate');
require('express-async-errors');

const pizzaValidation = require('../validations/pizza.validation');

const pizzaService = require('../services/pizza.service');

const createPizza = async (req, res) => {
  validateSchema(req, pizzaValidation.createPizza);

  const { type, description, price } = req.body;

  const createdPizza = await pizzaService.createPizza({
    type,
    description,
    price,
  });
  res.status(httpStatus.CREATED).send({ createdPizza });
};

const getAllPizza = async (req, res) => {
  const pizzas = await pizzaService.getAllPizza();

  res.status(httpStatus.CREATED).send({ totalPizza: pizzas.length, pizzas });
};

module.exports = {
  createPizza,
  getAllPizza,
};
