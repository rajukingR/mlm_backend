const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userHierarchyController = require('../controllers/hierarchy_user_controllers/userHierarchyController');
const { authMiddleware,isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer'); // Multer middleware for file uploads

// User routes
router.post('/signup',upload.single('image'),authMiddleware, userController.signUp);
router.post('/signin', userController.signIn);
//
router.put('/update/:userId', upload.single('image'),authMiddleware, userController.updateUser);
router.delete('/delete/:userId', authMiddleware,isAdmin, userController.deleteUser);
//
router.get('/all',authMiddleware, userController.getAllUsers);
router.get('/role-user',authMiddleware, userController.getUsersByRole);



module.exports = router;
 