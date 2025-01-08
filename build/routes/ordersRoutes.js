"use strict";

var express = require('express');
var router = express.Router();
var ordersController = require('../controllers/orderController'); // Ensure this path is correct
var _require = require('../middlewares/authUserMiddleware'),
  authUserMiddleware = _require.authUserMiddleware; // Import the authentication middleware

// Define route to fetch pending orders, applying the authUserMiddleware
router.get('/pending', authUserMiddleware, ordersController.fetchOrders);
// Additional routes can be added here

module.exports = router;