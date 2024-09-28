const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');


// Admin routes
router.post('/signup', adminController.signUp); // Admin sign-up
router.post('/signin', adminController.signIn); // Admin sign-in
router.put('/update', authMiddleware, adminController.updateAdmin);
router.get('/admin-details' ,authMiddleware,isAdmin,adminController.getAdminDetails);
router.get('/update-admin' ,authMiddleware,isAdmin,adminController.updateAdmin);


module.exports = router;
