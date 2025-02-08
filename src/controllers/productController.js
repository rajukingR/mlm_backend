<<<<<<< HEAD:controllers/productController.js
const { Product } = require('../models');
=======
'use strict';

// const { Product } = require('../models');
// const { Product, Order, OrderItem } = require('../models');
const { User, Product, OrderItem, Order,Notification } = require('../../models'); 
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


>>>>>>> murugan_api2:src/controllers/productController.js

// Create a new product
exports.createProduct = async (req, res) => {
  const {
    productName,
    modelName,
    description,
    productType,
    subProductType,
    isActive,
    category,      // Added category field
    subCategory,   // Added sub_category field
  } = req.body;

  try {
<<<<<<< HEAD:controllers/productController.js
    // Convert isActive to a boolean and then to 1 or 0 (1 for true, 0 for false)
    const productStatus = isActive === 'true' || isActive === true ? 1 : 0;

    // Extract files from the request (both thumbnail and fileDetails)
    const thumbnail = req.files && req.files['thumbnail'] ? req.files['thumbnail'][0].filename : null;
    const fileDetails = req.files && req.files['fileDetails'] ? req.files['fileDetails'][0].filename : null;

    // Create the product entry in the database
    const product = await Product.create({
      product_name: productName,
      model_name: modelName,
      description,
      product_type: productType,
      sub_product_type: subProductType,
      file_details: fileDetails,  // Store the PDF or ZIP file name
      is_active: productStatus,   // Set the product active status
      thumbnail: thumbnail,       // Store the image file name
      category,                  // Added category
      sub_category: subCategory, // Added sub_category
=======
    // Check if a product with the same name already exists and is active
    const existingProduct = await Product.findOne({
      where: { 
        name: req.body.name,
        isDeleted: 0, // Check for active products only
      },
>>>>>>> murugan_api2:src/controllers/productController.js
    });

    // Prepare the response with product data
    const responseData = {
      productName: product.product_name,
      modelName: product.model_name,
      description: product.description,
      productType: product.product_type,
      subProductType: product.sub_product_type,
      fileDetails: product.file_details, // Filename of the PDF or ZIP file
      isActive: product.is_active,
      thumbnail: product.thumbnail, // Filename of the image file
      category: product.category,    // Added category to the response
      subCategory: product.sub_category, // Added sub_category to the response
    };

<<<<<<< HEAD:controllers/productController.js
    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: responseData,
    });
=======
    // If the product is soft-deleted (isDeleted = 1), restore it
    const deletedProduct = await Product.findOne({
      where: { 
        name: req.body.name,
        isDeleted: 1, // Check for soft-deleted products
      },
    });

    if (deletedProduct) {
      // Restore the soft-deleted product
      await deletedProduct.update({ isDeleted: 0 });

      return res.status(200).json({ message: 'Product reactivated successfully', product: deletedProduct });
    }

    // Extract the filename from the uploaded file
    const imageFilename = req.file ? req.file.filename : null;

    // Create the product with the image filename and createdBy field
    const newProduct = await Product.create({
      ...req.body,
      image: imageFilename, // Save only the image filename
      createdBy: req.user.id, // Assuming req.user contains authenticated user data
      isDeleted: 0, // Set the product as active by default
    });

    // Fetch users to notify (assuming notification is for all users with specific roles)
    const users = await User.findAll({
      where: {
        role_name: {
          [Op.in]: ["Area Development Officer", "Master Distributor","Super Distributor", "Distributor","Customer"], // Adjust roles as needed
        },
      },
      attributes: ['id', 'full_name'],
    });

    // Create notifications for users
    const notifications = users.map((user) => ({
      user_id: user.id,
      message: `New Product Launch: ${newProduct.name}`,
      is_read: false,
      created_at: new Date(),
      detail: {
        product_id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        createdBy: req.user.id,
        user_name: user.full_name,
        image: imageFilename,
        type: 'product',
      },
    }));

    // Insert notifications in bulk
    await Notification.bulkCreate(notifications);

    // Emit event for new product notification
    req.io.emit('new_product', newProduct);

    return res.status(201).json({ message: 'Product created successfully', product: newProduct });
>>>>>>> murugan_api2:src/controllers/productController.js
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the product.',
    });
  }
};


//////GET ID BY PRODUCT DETAILS////////



exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);  // Find product by primary key (ID)

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found.`,
      });
    }

    // Prepare the response data
    const responseData = {
      id: product.id,
      productName: product.product_name,
      modelName: product.model_name,
      description: product.description,
      productType: product.product_type,
      subProductType: product.sub_product_type,
      fileDetails: product.file_details, // Filename of the PDF or ZIP file
      isActive: product.is_active,
      thumbnail: product.thumbnail, // Filename of the image file
      category: product.category,    // Added category to the response
      subCategory: product.sub_category, // Added sub_category to the response
      createdAt: product.created_at, // Created date
      updatedAt: product.updated_at, // Updated date
    };

    return res.status(200).json({
      success: true,
      message: 'Product retrieved successfully.',
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the product.',
    });
  }
};



//////GET ALL PRODUCT DETAILS////////



// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Extract role_id from the user
    const roleId = req.user.role_id;
    console.log('User Role ID:', roleId); // Log role_id for debugging

    // Fetch all products from the database
    const products = await Product.findAll();

    console.log('Fetched Products:', products); // Log fetched products for debugging

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found.',
      });
    }

    // Filter products based on role (B2B for Client role)
    let filteredProducts = products;

    if (roleId === 2) { // Check if the role is Client
      filteredProducts = products.filter(product => product.product_type === 'B2B'); // Change productType to product_type
      console.log('Filtered Products for Client:', filteredProducts); // Log filtered products
    }
    

    // Prepare the response data
    const responseData = filteredProducts.map(product => ({
      id: product.id,
      productName: product.product_name,
      modelName: product.model_name,
      description: product.description,
      productType: product.product_type,
      subProductType: product.sub_product_type,
      fileDetails: product.file_details, // Filename of the PDF or ZIP file
      isActive: product.is_active,
      thumbnail: product.thumbnail, // Filename of the image file
      category: product.category,    // Added category to the response
      subCategory: product.sub_category, // Added sub_category to the response
      createdAt: product.created_at, // Created date
      updatedAt: product.updated_at, // Updated date
    }));

    return res.status(200).json({
      success: true,
      message: 'Products retrieved successfully.',
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching products.',
    });
  }
};


/////PRODUCT ID BASED UPDATED SET



exports.updateProduct = async (req, res) => {
  const { id } = req.params; 
  const {
    productName,
    modelName,
    description,
    productType,
    subProductType,
    isActive,
    category,    
    subCategory, 
  } = req.body;

  try {

    const productStatus = isActive === 'true' || isActive === true ? 1 : 0;

    const thumbnail = req.files && req.files['thumbnail'] ? req.files['thumbnail'][0].filename : null;
    const fileDetails = req.files && req.files['fileDetails'] ? req.files['fileDetails'][0].filename : null;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    const updatedProduct = await product.update({
      product_name: productName || product.product_name,
      model_name: modelName || product.model_name,
      description: description || product.description,
      product_type: productType || product.product_type,
      sub_product_type: subProductType || product.sub_product_type,
      file_details: fileDetails || product.file_details, 
      is_active: productStatus !== undefined ? productStatus : product.is_active,
      thumbnail: thumbnail || product.thumbnail,     
      category: category || product.category,          
      sub_category: subCategory || product.sub_category, 
    });

    const responseData = {
      productName: updatedProduct.product_name,
      modelName: updatedProduct.model_name,
      description: updatedProduct.description,
      productType: updatedProduct.product_type,
      subProductType: updatedProduct.sub_product_type,
      fileDetails: updatedProduct.file_details, 
      isActive: updatedProduct.is_active,
      thumbnail: updatedProduct.thumbnail, 
      category: updatedProduct.category,    
      subCategory: updatedProduct.sub_category, 
    };

<<<<<<< HEAD:controllers/productController.js
    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      data: responseData,
    });
=======
    await Notification.destroy({
      where: { detail: { product_id: product.id } },
    });

    const users = await User.findAll({
      where: {
        role_name: {
          [Op.in]: ["Area Development Officer", "Master Distributor", "Super Distributor", "Distributor", "Customer"],
        },
      },
      attributes: ['id', 'full_name'],
    });

    const notifications = users.map((user) => ({
      user_id: user.id,
      message: `New Product Launch: ${product.name}`,
      is_read: false,
      created_at: new Date(),
      detail:{
        product_id: product.id,
        name: product.name,
        price: product.price,
        createdBy: req.user?.id || null,
        user_name: user.full_name,
        image: imageFilename,
        type: 'product',
        updated_at: new Date(),
      },
    }));

    await Notification.bulkCreate(notifications);


    // Update the product with the new details
    await product.update(updatedProductData);

    return res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//***** Get all products Admin *****//
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll({
//       where: {
//          isDeleted: false
//          } 
//     });
//     return res.status(200).json(products);
//   } catch (error) {
//     return handleErrors(res, error);
//   }
// };
exports.getAllProducts = async (req, res) => {
  try {
    const { id: userId, role_name: roleName } = req.user;

    // Check if the logged-in user is Admin
    if (roleName !== 'Admin') {
      return res.status(403).json({ message: 'Access denied. Only Admins can perform this action.' });
    }

    // Get all Admin IDs
    const adminUsers = await User.findAll({
      where: { role_name: 'Admin', status: 'Active' },
      attributes: ['id'],
      raw: true,
    });

    const adminIds = adminUsers.map((user) => user.id);

    if (adminIds.length === 0) {
      return res.status(400).json({ message: 'No Admin users found.' });
    }

    // Get all products
    const products = await Product.findAll({
      where: { isDeleted: false },
      raw: true,
    });

    // Fetch sold orders for all Admins
    const soldOrders = await OrderItem.findAll({
      where: {
        '$order.status$': 'Accepted',
        '$order.higher_role_id$': { [Op.in]: adminIds }, // Use Op.in for array filter
      },
      attributes: ['product_id', 'quantity'],
      include: [
        {
          model: Order,
          as: 'order',
          where: { status: 'Accepted', higher_role_id: { [Op.in]: adminIds } },
          attributes: [],
        },
      ],
      raw: true,
    });

    // Calculate stock quantity dynamically
    const productStockMap = {};

    // Aggregate sold quantities
    soldOrders.forEach((order) => {
      if (!productStockMap[order.product_id]) {
        productStockMap[order.product_id] = 0;
      }
      productStockMap[order.product_id] -= parseFloat(order.quantity || 0);
    });

    // Map products and include finalStockQuantity key
    const updatedProducts = products.map((product) => {
      const calculatedStock = (product.stock_quantity || 0) + (productStockMap[product.id] || 0);
      return {
        ...product,
        finalStockQuantity: product.stock_quantity, // Add the calculated stock quantity
      };
    });

    // return res.status(200).json(updatedProducts);

        // Sort and categorize products based on productVolume and category
        const categoryOrder = ['Oil', 'Toothpaste', 'Soap', 'Shampoo', 'Conditioner', 'Body Lotion'];
        const sortedProducts = [];
    
        categoryOrder.forEach((category) => {
          const categoryProducts = updatedProducts.filter((product) => product.category_name === category);
          
          // Sort products based on productVolume (liters or milliliters)
          categoryProducts.sort((a, b) => {
            const volumeA = parseFloat(a.productVolume);
            const volumeB = parseFloat(b.productVolume);
            return volumeB - volumeA; // Sorting in descending order (larger volumes first)
          });
    
          // Sort products with same volume based on quantity_type (L before ml)
          categoryProducts.sort((a, b) => {
            const typeA = a.quantity_type.toLowerCase();
            const typeB = b.quantity_type.toLowerCase();
            if (typeA === 'liters' && typeB === 'ml') return -1;
            if (typeA === 'ml' && typeB === 'liters') return 1;
            return 0;
          });
    
          // Push sorted category products
          sortedProducts.push(...categoryProducts);
        });
    
        // Return the sorted and mapped products
        return res.status(200).json(sortedProducts);


  } catch (error) {
    console.error('Error fetching products:', error.message, error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



// Get all products for the user
exports.getAllProductsForUser = async (req, res) => {
  try {
    const { role_name,id } = req.user; // Assuming the user's role is available in req.user


    // Get the current date for checking the price validity
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Find all products with necessary conditions
    const products = await Product.findAll({
      where: {
        isDeleted: false,
        status: "1", // Ensure string comparison for status
      },
    });

        // Received orders (user_id matches)
        const receivedOrders = await OrderItem.findAll({
          where: {
            '$order.status$': 'Accepted',
            '$order.user_id$': id,
          },
          attributes: ['product_id', 'quantity'],  // Assuming quantity represents total_order_quantity
          include: [{
            model: Order,
            as: 'order',
            where: { status: 'Accepted', user_id: id },
            attributes: [],  // Exclude unnecessary attributes from the order
          }],
        });
    
        // Sold orders (higher_role_id matches)
        const soldOrders = await OrderItem.findAll({
          where: {
            '$order.status$': 'Accepted',
            '$order.higher_role_id$': id,
          },
          attributes: ['product_id', 'quantity'],  // Assuming quantity represents total_order_quantity
          include: [{
            model: Order,
            as: 'order',
            where: { status: 'Accepted', higher_role_id: id },
            attributes: [],  // Exclude unnecessary attributes from the order
          }],
        });

            // Calculate stock quantity dynamically
    const productStockMap = {};

    // Aggregate received quantities
    receivedOrders.forEach((order) => {
      if (!productStockMap[order.product_id]) {
        productStockMap[order.product_id] = 0;
      }
      productStockMap[order.product_id] += parseFloat(order.quantity || 0);
    });

    // Aggregate sold quantities
    soldOrders.forEach((order) => {
      if (!productStockMap[order.product_id]) {
        productStockMap[order.product_id] = 0;
      }
      productStockMap[order.product_id] -= parseFloat(order.quantity || 0);
    });

    // Map over the products to check for auto-update prices
    const productsWithPrices = products.map((product) => {
      // let priceDetails = {};
      const stockQuantity = productStockMap[product.id] || 0;
      
      let priceDetails = {
        offerPrice: null,   // Default to null
        originalPrice: product.price, // Default original price to the base price
        Status: product.status, // Correctly assigning status
        Category: product.category_name, // Correctly assigning category name
        productVolume: product.productVolume, // Correctly assigning category name
        quantity_type: product.quantity_type, // Correctly assigning category name
        stock_quantity: product.stock_quantity, // Correctly assigning category name
        description: product.description, // Correctly assigning category name



      };

      // Ensure `fromDate` and `toDate` are properly formatted for comparison
      const fromDate = new Date(product.fromDate).toISOString().split('T')[0];
      const toDate = new Date(product.toDate).toISOString().split('T')[0];

      // Check if auto-update is enabled and within the valid date range
      const isOfferValid = product.autoUpdate === true && currentDate >= fromDate && currentDate <= toDate;

      if (isOfferValid) {
        // Set offer price based on role if offer is valid
        switch (role_name) {
          case 'Super Distributor':
            priceDetails.offerPrice = product.SD_price;
            break;
          case 'Distributor':
            priceDetails.offerPrice = product.distributor_price;
            break;
          case 'Master Distributor':
            priceDetails.offerPrice = product.MD_price;
            break;
          case 'Area Development Officer':
            priceDetails.offerPrice = product.ADO_price;
            break;
          case 'Customer':
            priceDetails.offerPrice = product.customer_price;
            break;
          default:
            priceDetails.offerPrice = product.price;
            break;
        }
      }

      // Determine original price based on the role
      switch (role_name) {
        case 'Super Distributor':
          priceDetails.originalPrice = product.sdPrice;
          break;
        case 'Distributor':
          priceDetails.originalPrice = product.distributorPrice;
          break;
        case 'Master Distributor':
          priceDetails.originalPrice = product.mdPrice;
          break;
        case 'Area Development Officer':
          priceDetails.originalPrice = product.adoPrice;
          break;
        case 'Customer':
          priceDetails.originalPrice = product.price;
          break;
        default:
          priceDetails.originalPrice = product.price;
          break;
      }

      // Return the final product details with both offer price and original price
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        // super1: priceDetails.super,
        // stock_quantity: product.stock_quantity,
        stock_quantity:stockQuantity,
        super1: priceDetails.offerPrice,
        originalPrice: priceDetails.originalPrice,
        category_name: product.category_name, // Correctly assigning category name
        status: product.status, // Correctly assigning status
        productVolume: product.productVolume, // Correctly assigning status
        quantity_type: product.quantity_type, // Correctly assigning status
        // stock_quantity: product.stock_quantity, // Correctly assigning status
        description: product.description, // Correctly assigning category name

        
      };
    });

    // Return the response with the mapped products and their prices
    // return res.status(200).json(productsWithPrices);

    // Sort products within each category by product volume and quantity_type
    const categoryOrder = ['Oil', 'Toothpaste', 'Soap', 'Shampoo', 'Conditioner', 'Body Lotion'];
    const sortedProducts = [];

    categoryOrder.forEach((category) => {
      const categoryProducts = productsWithPrices.filter((product) => product.category_name === category);
      
      // Sort products within category: Sort by productVolume (descending for liters, ascending for others)
      categoryProducts.sort((a, b) => {
        const volumeA = parseFloat(a.productVolume);
        const volumeB = parseFloat(b.productVolume);
        
        if (a.quantity_type === 'liters' && b.quantity_type !== 'liters') return -1; // 'liters' should come first
        if (b.quantity_type === 'liters' && a.quantity_type !== 'liters') return 1;  // 'liters' should come first

        return volumeB - volumeA; // For 'ml', sort in descending order of volume
      });

      sortedProducts.push(...categoryProducts);
    });

    // Return the response with the sorted and mapped products
    return res.status(200).json(sortedProducts);

        
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
// exports.getProductByIdForUser = async (req, res) => {
//   try {
//      const product = await Product.findOne({
//        where: {  
//         id: req.params.id,
//          isDeleted: false,
//          status: true
//          }
//     });
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     return res.status(200).json(product);
//   } catch (error) {
//     return handleErrors(res, error);
//   }
// };

exports.getProductByIdForUser = async (req, res) => {
  try {
    // Fetch the product by ID
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        isDeleted: false,
        status: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { id: productId } = product; // Extract product ID
    const userId = req.user.id; // Assuming the user ID is in req.use

    // Fetch received quantities for this product
    const receivedOrders = await OrderItem.findAll({
      where: {
        product_id: productId, // Filter by product ID
        '$order.status$': 'Accepted',
        '$order.user_id$': userId,
      },
      attributes: ['quantity'], // Fetch only quantity
      include: [
        {
          model: Order,
          as: 'order',
          where: { status: 'Accepted', user_id: userId },
          attributes: [],
        },
      ],
    });

    // Fetch sold quantities for this product
    const soldOrders = await OrderItem.findAll({
      where: {
        product_id: productId, // Filter by product ID
        '$order.status$': 'Accepted',
        '$order.higher_role_id$': userId,
      },
      attributes: ['quantity'], // Fetch only quantity
      include: [
        {
          model: Order,
          as: 'order',
          where: { status: 'Accepted', higher_role_id: userId },
          attributes: [],
        },
      ],
    });

    // Calculate stock quantity
    let stockQuantity = 0;

    // Aggregate received quantities
    receivedOrders.forEach((order) => {
      stockQuantity += parseFloat(order.quantity || 0);
    });

    // Subtract sold quantities
    soldOrders.forEach((order) => {
      stockQuantity -= parseFloat(order.quantity || 0);
    });

    product.stock_quantity = stockQuantity;

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return handleErrors(res, error);
  }
};



// //***  Soft delete a product ***//
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const [updatedRows] = await Product.update(
      { isDeleted: 1 }, 
      { where: { id: productId, isDeleted: 0 } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Product not found or already deleted' });
    }

    await Notification.destroy({
      where: {
        "detail.product_id": productId,
      },
    });

    await product.destroy();

    req.io.emit('delete_product', { productId });

    return res.status(200).json({ message: 'Product soft-deleted successfully' });

>>>>>>> murugan_api2:src/controllers/productController.js
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the product.',
    });
  }
};


<<<<<<< HEAD:controllers/productController.js
////////PRODUCT DELETE BY ID /////////////
=======
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
  }, 2 * 1000);  
}

autoUpdateProducts();
>>>>>>> murugan_api2:src/controllers/productController.js


// Delete an existing product by its ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params; // The product ID from the route parameter

  try {
    // Find the product by ID
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    // Delete the product from the database
    await product.destroy();

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the product.',
    });
  }
};


/////UPDATE ACTIVE STATUS////////



exports.UpdateActiveProduct = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    // Convert isActive to a boolean or number (if required)
    const productStatus = isActive === 'true' || isActive === true ? 1 : 0;

    // Find the product by ID
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    // Update only the isActive field
    await product.update({
      is_active: productStatus,
    });

    return res.status(200).json({
      success: true,
      message: 'Product active status updated successfully.',
      data: {
        id: product.id,
        isActive: product.is_active,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the active status.',
    });
  }
};
