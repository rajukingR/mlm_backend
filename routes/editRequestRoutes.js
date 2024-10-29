// routes/editRequestRoutes.js

const express = require('express');
const router = express.Router();
const editRequestController = require('../controllers/editRequest_Controller/editRequestController');

router.post('/create', editRequestController.createEditRequest);
router.get('/', editRequestController.getEditRequests);
router.get('/:id', editRequestController.getByIdEditRequest); // Rename to match controller
router.put('/:id', editRequestController.updateByIdEditRequest); // Rename to match controller
router.delete('/:id', editRequestController.deleteByIdEditRequest); // Rename to match controller

module.exports = router;
