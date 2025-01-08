"use strict";

var express = require('express');
var productController = require('../controllers/productController');
var router = express.Router();
var upload = require('../middlewares/multer'); // Multer middleware for file uploads
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware,
  isAdmin = _require.isAdmin;

// Routes for CRUD operations
router.get('/admin_product', authMiddleware, productController.getAllProducts);
router.get('/admin_product/:id', authMiddleware, productController.getProductById);
router.post('/', upload.single('image'), authMiddleware, isAdmin, productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.put('/:id/status', productController.updateProductStatus);
router["delete"]('/:id', authMiddleware, isAdmin, productController.deleteProduct);
//
router.get('/user_product', authMiddleware, productController.getAllProductsForUser);
router.get('/user_product/:id', authMiddleware, productController.getProductByIdForUser);
module.exports = router;