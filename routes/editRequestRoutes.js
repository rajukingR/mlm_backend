// routes/editRequestRoutes.js

const express = require('express');
const router = express.Router();
const editRequestController = require('../controllers/editRequest_Controller/editRequestController');
const upload = require('../middlewares/multer'); // Make sure multer is set up correctly

router.post('/create',upload.single('image'), editRequestController.createEditRequest);
router.get('/', editRequestController.getEditRequests);
router.get('/:id', editRequestController.getByIdEditRequest); // Rename to match controller
router.put('/:id',upload.single('image'), editRequestController.updateByIdEditRequest); // Rename to match controller
router.delete('/:id', editRequestController.deleteByIdEditRequest); // Rename to match controller

module.exports = router;
