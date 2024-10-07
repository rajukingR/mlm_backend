const express = require('express');
const router = express.Router();
const userOrderController = require('../controllers/order-controller/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create-order',authMiddleware, userOrderController.createOrder);
router.get('/get-order/:user_id',authMiddleware, userOrderController.getOrdersByUser);
router.get('/get-order-request/:user_id',authMiddleware, userOrderController.getOrdersBySubordinates);


module.exports = router;