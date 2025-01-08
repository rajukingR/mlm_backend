"use strict";

var express = require('express');
var router = express.Router();
var userOrderController = require('../controllers/order-controller/orderController');
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware;
router.post('/create-order', authMiddleware, userOrderController.createOrder);
router.get('/get-order/:user_id', authMiddleware, userOrderController.getOrdersByUser);
router.get('/get-orders/:user_id', userOrderController.getOrdersByUser);
router.get('/get-order-request/:user_id', authMiddleware, userOrderController.getOrdersBySubordinates);
router.get('/get-order-request', authMiddleware, userOrderController.getOrdersBySubordinatesAdmin);

//acceptOrRejectOrder
router.get('/get-order-detail/:id', authMiddleware, userOrderController.getOrderDetails);
//
router.put('/cancel-order/:orderId', authMiddleware, userOrderController.cancelOrder);
//
router.post('/accept-order/:orderId', authMiddleware, userOrderController.acceptOrder);
router.post('/order/:orderId', authMiddleware, userOrderController.acceptOrRejectOrder);
router.put('/cancel-order-admin/:orderId', authMiddleware, userOrderController.acceptOrRejectOrder);
//
router.post('/accept-order-admin/:orderId', authMiddleware, userOrderController.acceptOrRejectOrder);
module.exports = router;