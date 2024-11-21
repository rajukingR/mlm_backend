'use strict';

const { Category } = require('../../models');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

// Validation rules for category creation
const categoryValidationRules = [
  body('category_name').notEmpty().withMessage('Category name is required'),
  body('sector_name').optional().isString().withMessage('Sector name must be a string'),
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
    // Assuming req.user contains the user details, including the role
    const { role_name } = req.user; 

    // Check if the user has the "Admin" role
    if (role_name !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only admins can view categories.',
      });
    }

    // If the user is an admin, proceed with fetching categories
    const categories = await Category.findAll({
      where: { is_deleted: false } // Fetch non-deleted categories
    });

    return res.status(200).json({
      success: true,
      data: categories, // Return the categories in the response
    });
  } catch (error) {
    return handleErrors(res, error); // Handle errors appropriately
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
