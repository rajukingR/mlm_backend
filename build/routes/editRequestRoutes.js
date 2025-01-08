"use strict";

// routes/editRequestRoutes.js

var express = require('express');
var router = express.Router();
var editRequestController = require('../controllers/editRequest_Controller/editRequestController');
var upload = require('../middlewares/multer'); // Make sure multer is set up correctly

router.post('/create', upload.single('image'), editRequestController.createEditRequest);
router.get('/', editRequestController.getEditRequests);
router.get('/:id', editRequestController.getByIdEditRequest); // Rename to match controller
router["delete"]('/reject/:id', editRequestController.rejectByIdEditRequest); // Rename to match controller

module.exports = router;