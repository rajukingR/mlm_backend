const { SalesTarget } = require('../../models'); // Adjust the path according to your project structure

// Get all sales targets (Admin only)
exports.getSalesTargets = async (req, res) => {
  try {
    const { role_name } = req.user; // Assume role_name is part of req.user

    // Check if the user has the "Admin" role
    if (role_name !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only admins can view sales targets.',
      });
    }

    // Fetch all sales targets for admin
    const targets = await SalesTarget.findAll();
    return res.status(200).json({
      success: true,
      data: targets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch sales targets',
      error: error.message,
    });
  }
};


// Get sales target by product name
exports.getSalesTargetByProductName = async (req, res) => {
  const { product_name } = req.params;  // Capture the product_name from the URL parameter
  try {
    // Query the database for sales targets matching the product_name
    const targets = await SalesTarget.findAll({
      where: { product_name: product_name },
    });

    // If no targets are found, return a 404 error
    if (!targets || targets.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Sales targets for product '${product_name}' not found`,
      });
    }

    // Return the fetched sales targets
    return res.status(200).json({
      success: true,
      data: targets,
    });
  } catch (error) {
    // Handle any errors during the database query
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch sales target',
      error: error.message,
    });
  }
};


exports.createSalesTarget = async (req, res) => {
  const { product_name, targets } = req.body;

  if (!product_name || !Array.isArray(targets)) {
    return res.status(400).json({
      success: false,
      message: 'Product name and targets are required.',
    });
  }

  try {
    // Check if the product already exists
    const existingProduct = await SalesTarget.findOne({ where: { product_name } });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Sales targets for this product already exist.',
      });
    }

    const createdTargets = [];

    // Loop through each target entry
    for (const target of targets) {
      const { role, targetData } = target;

      // Validate required fields
      if (!role || !targetData || !Array.isArray(targetData)) {
        return res.status(400).json({
          success: false,
          message: 'Role and targetData (as an array) are required.',
        });
      }

      // Map over the targetData and restructure it with role as sub-array
      const formattedProductData = targetData.map((data) => ({
        role: role, // Set role inside each target
        target: data.target, // Preserve target value
        duration: data.duration, // Preserve duration value
      }));

      // Create sales target entry
      const createdTarget = await SalesTarget.create({
        product_name, // Keep product_name at the root
        product_data: JSON.stringify(formattedProductData), // Store the formatted product data as JSON
      });

      createdTargets.push(createdTarget);
    }

    return res.status(201).json({
      success: true,
      message: 'Sales targets created successfully',
      data: createdTargets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create sales targets',
      error: error.message,
    });
  }
};



exports.updateSalesTarget = async (req, res) => {
  const { product_name } = req.params;  // Get the product_name from URL parameter
  const { productData } = req.body;     // Get the updated productData array from the request body

  // Validate that productData is provided
  if (!productData || !Array.isArray(productData) || productData.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Product data is required and should be an array.',
    });
  }

  try {
    // Find all sales targets for the given product_name
    const targets = await SalesTarget.findAll({
      where: { product_name: product_name },
    });

    // If no targets are found for the given product_name, return a 404 error
    if (!targets || targets.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Sales targets for product '${product_name}' not found`,
      });
    }

    // Loop through each target and update the target and duration in the product data
    for (const target of targets) {
      let productDataFromDb;

      // Check if the product_data is already an object or needs to be parsed
      if (typeof target.product_data === 'string') {
        try {
          productDataFromDb = JSON.parse(target.product_data); // Parse if it's a string
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: 'Failed to parse product data. Invalid JSON format.',
          });
        }
      } else {
        // If it's already an object, use it directly
        productDataFromDb = target.product_data;
      }

      // Loop through each item in the productData from the request body
      for (const updatedData of productData) {
        // Find the corresponding role in the existing productData
        const matchingItem = productDataFromDb.find(item => item.role === updatedData.role);

        if (matchingItem) {
          // Update the target and duration for the matching role
          matchingItem.target = updatedData.target;
          matchingItem.duration = updatedData.duration;
        }
      }

      // Save the updated product data back to the database
      await target.update({
        product_data: JSON.stringify(productDataFromDb), // Store updated data as a stringified JSON
      });
    }

    // Return success response after updating
    return res.status(200).json({
      success: true,
      message: 'Sales targets updated successfully.',
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: 'Failed to update sales targets',
      error: error.message,
    });
  }
};

exports.deleteSalesTarget = async (req, res) => {
  const { productName } = req.params;

  try {
    const targetsToDelete = await SalesTarget.findAll({
      where: { product_name: productName },
    });

    if (!targetsToDelete.length) {
      return res.status(404).json({
        success: false,
        message: 'No sales targets found for this product',
      });
    }

    // Delete all sales targets for the given product name
    await SalesTarget.destroy({
      where: { product_name: productName },
    });

    return res.status(200).json({
      success: true,
      message: `All sales targets for product '${productName}' deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete sales targets',
      error: error.message,
    });
  }
};
