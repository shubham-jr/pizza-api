const express = require('express');

const router = express.Router();

// File_Appending
const orderRoute = require('./order.route');
const pizzaRoute = require('./pizza.route');
const authRoute = require('./auth.route');

// Routes_Appending
router.use('/order', orderRoute);
router.use('/pizza', pizzaRoute);
router.use('/auth', authRoute);

module.exports = router;
