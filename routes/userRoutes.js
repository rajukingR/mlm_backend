const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); // Import the login controller

// Route for user login
router.post('/login', UserController.userLogin);

module.exports = router;
