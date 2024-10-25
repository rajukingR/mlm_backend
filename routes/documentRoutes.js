// routes/documentRoutes.js

const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document_controller/documentController'); // Adjust the path as needed
const upload = require('../middlewares/multer'); // Make sure multer is set up correctly

router.get('/', documentController.getDocuments);

router.get('/:id', documentController.getByIdDocument);

router.post('/create', upload.single('image'), documentController.createDocument);

router.put('/:id', upload.single('image'), documentController.updateByIdDocument);

router.delete('/:id', documentController.deleteByIdDocument);

module.exports = router;
