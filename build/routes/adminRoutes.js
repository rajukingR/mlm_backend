"use strict";

var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware,
  isAdmin = _require.isAdmin;
var upload = require('../middlewares/multer'); // Make sure multer is set up correctly

// Admin routes
router.post('/signup', adminController.signUp); // Admin sign-up
router.post('/signin', adminController.signIn); // Admin sign-in
router.put('/update', upload.single('image'), authMiddleware, adminController.updateAdmin);
router.get('/admin-details', authMiddleware, adminController.getAdminDetails);
// router.get('/update-admin' ,authMiddleware,isAdmin,adminController.updateAdmin);

module.exports = router;