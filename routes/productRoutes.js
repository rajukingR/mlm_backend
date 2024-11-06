const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/multer'); // Make sure Multer is set up to handle file uploads

// Define routes for product operations
router.post('/', upload.single('image'), productController.createProduct); // Route for creating a new product
router.get('/', productController.getAllProducts); // Route to get all products
router.get('/:id', productController.getProductById); // Route to get a single product by ID
router.put('/:id', upload.single('image'), productController.updateProduct); // Route to update a product
router.delete('/:id', productController.deleteProduct); // Route to delete a product

module.exports = router;
