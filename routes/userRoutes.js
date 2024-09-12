const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/signup', userController.signUp); // User sign-up
router.post('/signin', userController.signIn); // User sign-in

module.exports = router;
