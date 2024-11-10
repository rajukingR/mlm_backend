const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const upload = require('../middlewares/multer'); // Multer middleware for file uploads
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

// Routes for CRUD operations
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('image'), authMiddleware, isAdmin, productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;


///product