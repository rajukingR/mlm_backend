'use strict';

const { Category } = require('../../models');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const { Op } = require('sequelize'); // Add this line to import Op

// Validation rules for category creation
const categoryValidationRules = [
  body('category_name').notEmpty().withMessage('Category name is required'),
];

// Utility function to handle errors
const handleErrors = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error: error.message || 'An error occurred' });
};

// Create Category
exports.createCategory = [
  ...categoryValidationRules, // Validate request body
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingCategory = await Category.findOne({
        where: { category_name: req.body.category_name }
      });

      if (existingCategory) {
        return res.status(409).json({ error: 'Category name is already exists' });
      }

      // Create the category using the validated data
      const newCategory = await Category.create({
        sector_name: req.body.sector_name, // optional
        category_name: req.body.category_name // required
      });

      // Respond with the newly created category
      return res.status(201).json(newCategory);
    } catch (error) {
      return handleErrors(res, error);
    }
  }
];

// Get all Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { is_deleted: false }
    });
    return res.status(200).json(categories);
  } catch (error) {
    return handleErrors(res, error);
  }
};

// Get Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id, is_deleted: false }
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    return handleErrors(res, error);
  }
};

// Update Category
exports.updateCategory = [
  ...categoryValidationRules, // Validate request body
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const categoryId = req.params.id;
      const categoryName = req.body.category_name;

      // Check if the category already exists (except for the current category)
      const existingCategory = await Category.findOne({
        where: { category_name: categoryName, id: { [Op.ne]: categoryId } }, // Exclude the current category
      });

      if (existingCategory) {
        return res.status(409).json({ error: 'Category with this name already exists' });
      }

      // Update category if no conflict with name
      const [updated] = await Category.update(req.body, {
        where: { id: categoryId },
      });

      if (!updated) {
        return res.status(404).json({ error: 'Category not found' });
      }

      return res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
      return handleErrors(res, error);
    }
  }
];

// Delete Category (Mark as deleted)
exports.deleteCategory = [
  async (req, res) => {
    try {
      const [updated] = await Category.update(
        { is_deleted: true },
        { where: { id: req.params.id } }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(200).json({ message: 'Category marked as deleted successfully' });
    } catch (error) {
      return handleErrors(res, error);
    }
  }
];
