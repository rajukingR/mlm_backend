const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin routes
router.post('/signup', adminController.signUp); // Admin sign-up
router.post('/signin', adminController.signIn); // Admin sign-in

module.exports = router;
