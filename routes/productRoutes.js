'use strict';

const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const upload = require('../middlewares/multer'); // Make sure multer is set up correctly
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

// Define routes for CRUD operations
router.post('/',upload.single('image'),authMiddleware,isAdmin, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',upload.single('image'),authMiddleware,isAdmin, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
