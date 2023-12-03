const httpStatus = require('http-status');
const validateSchema = require('../middlewares/validate');
require('express-async-errors');

const orderValidation = require('../validations/order.validation');

const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
  validateSchema(req, orderValidation.createOrder);

  const { userId, pizzaId, quantity, address } = req.body;

  const createdOrder = await orderService.createOrder({
    userId,
    pizzaId,
    quantity,
    address,
  });
  res
    .status(httpStatus.CREATED)
    .send({ status: 'succcess', data: createdOrder });
};

const getAllOrder = async (req, res) => {
  const orders = await orderService.getAllOrder();

  res
    .status(httpStatus.CREATED)
    .send({ status: 'succcess', data: { totalOrder: orders.length, orders } });
};

const getOrder = async (req, res) => {
  const { id } = req.params;

  const order = await orderService.getOrder({ id });

  res.status(httpStatus.CREATED).send({ status: 'succcess', data: order });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;

  validateSchema(req, orderValidation.updateOrder);

  const updatedorder = await orderService.updateOrder({ id, body: req.body });

  res
    .status(httpStatus.CREATED)
    .send({ status: 'succcess', data: updatedorder });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  await orderService.deleteOrder({ id });

  res.status(httpStatus.CREATED).send({
    status: 'succcess',
    message: 'Order deleted successfully',
  });
};

module.exports = {
  createOrder,
  getAllOrder,
  updateOrder,
  getOrder,
  deleteOrder,
};
