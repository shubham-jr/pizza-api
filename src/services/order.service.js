const httpStatus = require('http-status');
require('express-async-errors');
const client = require('../utils/database');
const ApiError = require('../utils/ApiError');

const createOrder = async ({ userId, pizzaId, quantity, address }) => {
  const createOrderQuery = `
  INSERT INTO orders (userid, pizzaid, quantity, address, totalprice)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

  // check if pizza exist
  const pizza = await client.query('SELECT * FROM pizzas WHERE id = $1', [
    pizzaId,
  ]);

  if (!pizza.rows.length)
    throw new ApiError(httpStatus.NOT_FOUND, 'Pizza not found');

  // check if user exist

  const user = await client.query('SELECT * FROM users WHERE id = $1', [
    userId,
  ]);

  if (!user.rows.length)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  // calculate total price

  const totalPrice = pizza.rows[0].price * quantity;

  const values = [userId, pizzaId, quantity, address, totalPrice];

  const { rows: createdOrder } = await client.query(createOrderQuery, values);

  return createdOrder;
};

// const getAllOrder = async () => {
//   const selectOrdersQuery = `
//   SELECT *
//   FROM orders;
// `;

//   const { rows: orders } = await client.query(selectOrdersQuery);

//   return orders;
// };

const getAllOrder = async () => {
  const selectOrdersQuery = `
    SELECT
      orders.id,
      orders.userid,
      orders.pizzaid,
      orders.quantity,
      orders.address,
      orders.status,
      orders.totalprice,
      users.name as username,
      pizzas.type as pizza_type
    FROM
      orders
      JOIN users ON orders.userid = users.id
      JOIN pizzas ON orders.pizzaid = pizzas.id;
  `;

  const { rows: ordersWithDetails } = await client.query(selectOrdersQuery);

  return ordersWithDetails;
};

// const getOrder = async ({ id }) => {
//   const selectOrderByIdQuery = `
//     SELECT *
//     FROM orders
//     WHERE id = $1;
//   `;

//   const { rows: order } = await client.query(selectOrderByIdQuery, [id]);

//   return order;
// };

const getOrder = async ({ id }) => {
  const selectOrderByIdQuery = `
    SELECT
      orders.id,
      orders.userid,
      orders.pizzaid,
      orders.quantity,
      orders.address,
      orders.status,
      orders.totalprice,
      users.name as username,
      pizzas.type as pizza_type,
      pizzas.description as pizza_description,
      pizzas.price as pizza_price
    FROM
      orders
      JOIN users ON orders.userid = users.id
      JOIN pizzas ON orders.pizzaid = pizzas.id
    WHERE
      orders.id = $1;
  `;

  const { rows: orderWithDetails } = await client.query(selectOrderByIdQuery, [
    id,
  ]);

  return orderWithDetails;
};

const updateOrder = async ({ id, body }) => {
  const updateOrderQuery = `
  UPDATE orders
  SET status = $1
  WHERE id = $2
  RETURNING *;
`;

  const values = [body.status, id];

  const { rows: updatedOrder } = await client.query(updateOrderQuery, values);

  return updatedOrder;
};

const deleteOrder = async ({ id }) => {
  const deleteOrderQuery = `
  DELETE FROM orders
  WHERE id = $1
  RETURNING *;
`;

  const values = [id];

  const { rows: deletedOrder } = await client.query(deleteOrderQuery, values);

  if (!deletedOrder.length)
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
