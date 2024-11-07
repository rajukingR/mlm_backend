const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController'); // Ensure this path is correct

// Define routes
router.get('/pending', ordersController.fetchOrders); // Fetch all orders

// Additional routes can be added here

module.exports = router;
