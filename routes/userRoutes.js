const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userHierarchyController = require('../controllers/hierarchy_user_controllers/userHierarchyController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const {authUserMiddleware} = require('../middlewares/authUserMiddleware');

// User routes
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn); 
//
router.put('/update/:userId', authMiddleware, userController.updateUser);
router.delete('/delete/:userId', authMiddleware, userController.deleteUser);
//
router.get('/all', authMiddleware, userController.getAllUsers);
//
router.get('/hierarchy', authUserMiddleware, userHierarchyController.getHierarchicalUsers);


module.exports = router;
 