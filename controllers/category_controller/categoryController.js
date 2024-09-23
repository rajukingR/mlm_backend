'use strict';

const { Category } = require('../../models');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

const categoryValidationRules = [
  body('category_name').notEmpty().withMessage('Category name is required')
];

// Utility function for handling errors
const handleErrors = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error: error.message || 'An error occurred' });
};

// Middleware to validate admin role
const validateAdminRole = (req, res, next) => {
  if (req.user.role_name !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

// Create Category (Admin Only)
exports.createCategory = [
  validateAdminRole, // Only admin can create
  ...categoryValidationRules,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newCategory = await Category.create({
        ...req.body
      });

      return res.status(201).json(newCategory);
    } catch (error) {
      return handleErrors(res, error);
    }
  }
];

// Get all Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return handleErrors(res, error);
  }
};

// Get Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    return handleErrors(res, error);
  }
};

// Update Category (Admin Only)
exports.updateCategory = [
  validateAdminRole, // Only admin can update
  ...categoryValidationRules,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const [updated] = await Category.update(req.body, {
        where: { id: req.params.id }
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

// Delete Category (Admin Only)
exports.deleteCategory = [
  validateAdminRole, // Only admin can delete
  async (req, res) => {
    try {
      const deleted = await Category.destroy({
        where: { id: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      return handleErrors(res, error);
    }
  }
];
