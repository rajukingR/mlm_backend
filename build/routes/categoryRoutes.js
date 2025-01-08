"use strict";

var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category_controller/categoryController');
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router["delete"]('/:id', categoryController.deleteCategory);
module.exports = router;