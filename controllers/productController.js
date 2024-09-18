'use strict';

const { Product } = require('../models');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const productValidationRules = [
  body('image').isURL().withMessage('Image URL must be a valid URL'),
  body('name').notEmpty().withMessage('Product name is required'),
  body('product_code').notEmpty().withMessage('Product Id is required'),
  body('productVolume').notEmpty().withMessage('Product volume must be a decimal number'),
  body('price').isDecimal().withMessage('MRP price must be a decimal number'),
  body('adoPrice').isDecimal().withMessage('ADO price must be a decimal number'),
  body('mdPrice').isDecimal().withMessage('MD price must be a decimal number'),
  body('sdPrice').isDecimal().withMessage('SD price must be a decimal number'),
  body('distributorPrice').isDecimal().withMessage('Distributor price must be a decimal number'),
  body('status').isBoolean().withMessage('Activate status must be a boolean'),
];

// Utility function to handle errors
const handleErrors = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error: error.message || 'An error occurred' });
};

// Middleware to validate admin role
const validateAdminRole = (req, res, next) => {
  console.log('User role:', req.user.role);

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};



exports.createProduct = [
    validateAdminRole, // Ensure only admin can create a product
    ...productValidationRules,
    async (req, res) => {
      try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // Check if a product with the same name already exists
        const existingProduct = await Product.findOne({
          where: { name: req.body.name }
        });
        if (existingProduct) {
          return res.status(400).json({ error: 'Product with this name already exists' });
        }
  
        // Create the product with createdBy field
        const newProduct = await Product.create({
          ...req.body,
          createdBy: req.user.id // Assuming req.user contains authenticated user data
        });
        return res.status(201).json(newProduct);
      } catch (error) {
        return handleErrors(res, error);
      }
    }
  ];

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return handleErrors(res, error);
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return handleErrors(res, error);
  }
};

// Update a product
exports.updateProduct = [
  validateAdminRole, // Ensure only admin can update a product
  ...productValidationRules,
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const [updated] = await Product.update(req.body, {
        where: { id: req.params.id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      return handleErrors(res, error);
    }
  }
];

// Delete a product
exports.deleteProduct = [
  validateAdminRole, // Ensure only admin can delete a product
  async (req, res) => {
    try {
      const deleted = await Product.destroy({
        where: { id: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      // return res.status(204).send();
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      return handleErrors(res, error);
    }
  }
];
