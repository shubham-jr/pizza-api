const express = require('express');

const router = express.Router();

const orderController = require('../controllers/order.controller');
const { protect, restrictTo } = require('../middlewares/auth');

router.use(protect);

router.post('/', orderController.createOrder);
router.get('/', restrictTo('admin'), orderController.getAllOrder);
router.get('/:id', orderController.getOrder);
router.patch('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
