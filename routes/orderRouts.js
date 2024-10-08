const express = require('express');
const router = express.Router();
const userOrderController = require('../controllers/order-controller/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create-order',authMiddleware, userOrderController.createOrder);
router.get('/get-order/:user_id',authMiddleware, userOrderController.getOrdersByUser);
router.get('/get-order-request/:user_id',authMiddleware, userOrderController.getOrdersBySubordinates);
//
router.get('/get-order-detail/:id',authMiddleware, userOrderController.getOrderDetails);
//
router.put('/cancel-order/:orderId',authMiddleware, userOrderController.cancelOrder);


module.exports = router;