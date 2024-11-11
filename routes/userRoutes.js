const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userHierarchyController = require('../controllers/hierarchy_user_controllers/userHierarchyController');
const { authMiddleware,isAdmin } = require('../middlewares/authMiddleware');

// User routes
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
//
router.put('/update/:userId', authMiddleware,isAdmin, userController.updateUser);
router.delete('/delete/:userId', authMiddleware,isAdmin, userController.deleteUser);
//
router.get('/all',authMiddleware,isAdmin, userController.getAllUsers);
router.get('/role-user',authMiddleware,isAdmin, userController.getUsersByRole);



module.exports = router;
 