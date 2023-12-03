const express = require('express');

const router = express.Router();

const pizzaController = require('../controllers/pizza.controller');

router.post('/', pizzaController.createPizza);
router.get('/', pizzaController.getAllPizza);

module.exports = router;
