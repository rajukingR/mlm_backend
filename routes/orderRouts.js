const express = require('express');
const router = express.Router();
const userOrderController = require('../controllers/order-controller/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create-order',authMiddleware, userOrderController.createOrder);


module.exports = router;``