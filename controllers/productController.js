const { Product } = require('../models');

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

    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: responseData,
    });
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

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the product.',
    });
  }
};


////////PRODUCT DELETE BY ID /////////////


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
