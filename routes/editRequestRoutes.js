// routes/editRequestRoutes.js

const express = require('express');
const router = express.Router();
const editRequestController = require('../controllers/editRequest_Controller/editRequestController');
const upload = require('../middlewares/multer'); // Make sure multer is set up correctly

router.post('/create',upload.single('image'), editRequestController.createEditRequest);
router.get('/', editRequestController.getEditRequests);
router.get('/:id', editRequestController.getByIdEditRequest); // Rename to match controller
router.delete('/reject/:id', editRequestController.deleteByIdEditRequest); // Rename to match controller

module.exports = router;
