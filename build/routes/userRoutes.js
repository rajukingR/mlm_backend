"use strict";

var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var userHierarchyController = require('../controllers/hierarchy_user_controllers/userHierarchyController');
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware,
  isAdmin = _require.isAdmin;
var upload = require('../middlewares/multer'); // Multer middleware for file uploads

// User routes
router.post('/signup', upload.single('image'), authMiddleware, userController.signUp);
router.post('/signin', userController.signIn);
router.post('/signin_web', userController.signInWeb);
//
router.put('/update/:userId', upload.single('image'), authMiddleware, userController.updateUser);
router["delete"]('/delete/:userId', authMiddleware, isAdmin, userController.deleteUser);
//
router.get('/all', authMiddleware, userController.getAllUsers);
router.get('/customer-deatils/:userID', userController.getUserById);
router.get('/role-user', authMiddleware, userController.getUsersByRole);
router.get('/:userId', userController.getUserCounts);
module.exports = router;