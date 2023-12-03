require('express-async-errors');
const client = require('../utils/database');

const createPizza = async ({ type, description, price }) => {
  const createdPizza = await client.query(
    'INSERT INTO pizzas(type, description, price) VALUES($1, $2, $3) RETURNING *',
    [type, description, price]
  );

  return createdPizza.rows;
};

const getAllPizza = async () => {
  const pizza = await client.query('SELECT * FROM pizzas');

  return pizza.rows;
};

module.exports = {
  createPizza,
  getAllPizza,
};
