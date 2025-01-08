"use strict";

var express = require('express');
var router = express.Router();
var orderLimitController = require('../controllers/orderLimitController');
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware;
router.get('/', authMiddleware, orderLimitController.getOrderLimits);
router.post('/create', orderLimitController.createOrderLimit);
router.put('/:id', orderLimitController.updateOrderLimit);
router["delete"]('/:id', orderLimitController.deleteOrderLimit);
module.exports = router;