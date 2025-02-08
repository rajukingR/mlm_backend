const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/multer');
const { authMiddleware, isAdmin, setClientRole } = require('../middlewares/authMiddleware'); 

// Assuming the frontend sends two files: 'image' and 'fileDetails'
router.post('/create',authMiddleware, isAdmin, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'fileDetails', maxCount: 1 }]), productController.createProduct);
router.put('/:id', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'fileDetails', maxCount: 1 }]), productController.updateProduct);

router.get('/',authMiddleware, setClientRole, productController.getAllProducts);
router.get('/:id',authMiddleware, isAdmin, productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.put('/active/:id', productController.UpdateActiveProduct);


module.exports = router;
