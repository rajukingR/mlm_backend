"use strict";

// routes/documentRoutes.js

var express = require('express');
var router = express.Router();
var documentController = require('../controllers/document_controller/documentController'); // Adjust the path as needed
var upload = require('../middlewares/multer'); // Make sure multer is set up correctly
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware,
  isAdmin = _require.isAdmin;
var _require2 = require('../middlewares/authUserMiddleware'),
  authUserMiddleware = _require2.authUserMiddleware; // Import the authentication middleware

router.get('/', authMiddleware, documentController.getDocuments);
router.get('/admin', authMiddleware, documentController.getDocumentsAdmin);
router.get('/:id', documentController.getByIdDocument);
router.post('/create', upload.single('image'), documentController.createDocument);
router.put('/:id', upload.single('image'), documentController.updateByIdDocument);
router["delete"]('/:id', documentController.deleteByIdDocument);
module.exports = router;