"use strict";

var express = require('express');
var router = express.Router();
var requestController = require('../controllers/request_controller/requestController');

// Define routes
router.get('/', requestController.fetchRequests); // Fetch requests
router.post('/create', requestController.createRequest); // Create a request
router.put('/approval', requestController.handleApproval); // Handle approval/forwarding

module.exports = router;