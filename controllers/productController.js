'use strict';

const { Product } = require('../models');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const { Op } = require('sequelize'); // Correct import for Sequelize operators
const { Sequelize } = require('sequelize'); // Import Sequelize



const productValidationRules = [
  body('image')
    .optional()
    .custom((value) => {
      // Allow image file path or a valid URL
      if (value && !(value.startsWith('http://') || value.startsWith('https://') || value.endsWith('.jpg') || value.endsWith('.png'))) {
        throw new Error('Image must be a valid URL or file path');
      }
      return true;
    }),
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

  if (req.user.role_name !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};



exports.createProduct = async (req, res) => {
  try {
    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({
      where: { name: req.body.name },
    });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product name is already exists' });
    }

    // Extract the filename from the uploaded file
    const imageFilename = req.file ? req.file.filename : null;

    // Create the product with the image filename and createdBy field
    const newProduct = await Product.create({
      ...req.body,
      image: imageFilename, // Save only the image filename
      createdBy: req.user.id, // Assuming req.user contains authenticated user data
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Fetch the existing product
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the new product name already exists (excluding the current product)
    const existingProduct = await Product.findOne({
      where: {
        name,
        id: { [Sequelize.Op.ne]: id }, // Exclude current product by ID
      },
    });

    if (existingProduct) {
      return res.status(400).json({ error: 'Product name is already exists.' });
    }

    // Extract the filename from the uploaded file or use the existing image
    const imageFilename = req.file ? req.file.filename : product.image;

    // Update product details, including image if provided
    const updatedProductData = {
      ...req.body,
      image: imageFilename, // Use new image or keep existing one
    };

    await product.update(updatedProductData);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//***** Get all products Admin *****//
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
         isDeleted: false
         } 
    });
    return res.status(200).json(products);
  } catch (error) {
    return handleErrors(res, error);
  }
};

// Get all products for the user
exports.getAllProductsForUser = async (req, res) => {
  try {
    const { role_name } = req.user; // Assuming the user's role is available in req.user

    // Get the current date for checking the price validity
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Find all products with necessary conditions
    const products = await Product.findAll({
      where: {
        isDeleted: false,
        status: "1", // Ensure string comparison for status
      },
    });

    // Map over the products to check for auto-update prices
    const productsWithPrices = products.map((product) => {
      let priceDetails = {};

      // Ensure `fromDate` and `toDate` are properly formatted for comparison
      const fromDate = new Date(product.fromDate).toISOString().split('T')[0];
      const toDate = new Date(product.toDate).toISOString().split('T')[0];

      // Check if auto-update is enabled and within the valid date range
      const isOfferValid = product.autoUpdate === true && currentDate >= fromDate && currentDate <= toDate;

      // Determine the price based on the role and whether the offer is valid
      if (isOfferValid) {
        switch (role_name) {
          case 'Super Distributor':
            priceDetails = { super: product.SD_price };
            break;
          case 'Distributor':
            priceDetails = { super: product.distributor_price };
            break;
          case 'Master Distributor':
            priceDetails = { super: product.MD_price };
            break;
          case 'Area Development Officer':
            priceDetails = { super: product.ADO_price };
            break;
          case 'Customer':
            priceDetails = { super: product.customer_price };
            break;
          default:
            priceDetails = { super: product.price };
            break;
        }
      } else {
        // Set price based on the role for original prices if autoUpdate is false or outside the date range
        switch (role_name) {
          case 'Super Distributor':
            priceDetails = { super: product.sdPrice };
            break;
          case 'Distributor':
            priceDetails = { super: product.distributorPrice };
            break;
          case 'Master Distributor':
            priceDetails = { super: product.mdPrice };
            break;
          case 'Area Development Officer':
            priceDetails = { super: product.adoPrice };
            break;
          case 'Customer':
            priceDetails = { super: product.price };
            break;
          default:
            priceDetails = { super: product.price };
            break;
        }
      }

      // Return the final product details with the correct price for the role
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        super1: priceDetails.super,
      };
    });

    // Return the response with the mapped products and their prices
    return res.status(200).json(productsWithPrices);
  } catch (error) {
    console.error("Error fetching products:", error);
    return handleErrors(res, error);
  }
};


//******  Get a single product by ID for Admin *****//
exports.getProductById = async (req, res) => {
  try {
     const product = await Product.findOne({
       where: { 
        id: req.params.id,
         isDeleted: false,
         }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return handleErrors(res, error);
  }
};

//////***** User get id products *****////
exports.getProductByIdForUser = async (req, res) => {
  try {
     const product = await Product.findOne({
       where: {  
        id: req.params.id,
         isDeleted: false,
         status: true
         }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return handleErrors(res, error);
  }
};


// //***  Soft delete a product ***//
exports.deleteProduct = async (req, res) => {
  try {
    const [updatedRows] = await Product.update(
      { isDeleted: 1 }, 
      { where: { id: req.params.id, isDeleted: 0 } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Product not found or already deleted' });
    }

    return res.status(200).json({ message: 'Product soft-deleted successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
};


// Function to check for expired offers and update products every 30 seconds
function autoUpdateProducts() {
  setInterval(async () => {
    try {
      const currentDate = new Date();

      const productsToUpdate = await Product.findAll({
        where: {
          isDeleted: 0,  
          toDate: {
            [Op.lt]: currentDate 
          }
        }
      });

      const result = await Product.update(
        {
          autoUpdate: false,  
          customer_price: 0,  
          ADO_price: 0,
          MD_price: 0,
          SD_price: 0,
          distributor_price: 0,
          fromDate: null, 
          toDate: null
        },
        {
          where: {
            isDeleted: 0,  
            toDate: {
              [Op.lt]: currentDate 
            }
          }
        });

      productsToUpdate.forEach(product => {
        console.log(`Product ID ${product.id} updated successfully.`);
      });

    } catch (error) {
      console.error('Error updating products:', error);
    }
  }, 30 * 1000);  
}

autoUpdateProducts();
