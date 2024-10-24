const { SalesTarget } = require('../../models'); // Adjust the path according to your project structure

// Get all sales targets
exports.getSalesTargets = async (req, res) => {
  try {
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

// Get a sales target by ID
exports.getSalesTargetById = async (req, res) => {
  const { id } = req.params;
  try {
    const target = await SalesTarget.findByPk(id);

    if (!target) {
      return res.status(404).json({
        success: false,
        message: 'Sales target not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: target,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch sales target',
      error: error.message,
    });
  }
};

// Create a new sales target
exports.createSalesTarget = async (req, res) => {
  const { targets } = req.body;

  // Validate input
  if (!targets || !Array.isArray(targets)) {
    return res.status(400).json({
      success: false,
      message: 'Targets must be an array and is required.',
    });
  }

  try {
    const createdTargets = [];

    // Loop through each target object
    for (const target of targets) {
      const { role, productData } = target;

      // Validate required fields
      if (!role || !productData || !Array.isArray(productData)) {
        return res.status(400).json({
          success: false,
          message: 'Role and productData (as an array) are required.',
        });
      }

      // Create entry in the database
      const createdTarget = await SalesTarget.create({
        role,
        productData,
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
// Update an existing sales target
exports.updateSalesTarget = async (req, res) => {
  const { id } = req.params;
  const { role, productData } = req.body;

  try {
    // Validate incoming data
    if (!Array.isArray(productData) || productData.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product data provided.',
      });
    }

    // Fetch the existing sales target record
    const salesTargetRecord = await SalesTarget.findOne({ where: { id } });
    
    // Check if the record exists
    if (!salesTargetRecord) {
      return res.status(404).json({
        success: false,
        message: 'Sales target not found',
      });
    }

    // Prepare a new productData array
    const updatedProductData = productData.map(product => {
      const { productType, target, duration } = product;

      // Validate required fields
      if (!productType || target === undefined) {
        throw new Error('Product type and target are required.');
      }

      return {
        productType,
        target: parseFloat(target),
        duration: duration || 'Not specified',
      };
    });

    // Update the role and productData
    salesTargetRecord.role = role; // Update the role if necessary
    salesTargetRecord.productData = updatedProductData; // Set the updated product data

    // Mark productData as changed
    salesTargetRecord.changed('productData', true); // Mark productData as changed
    salesTargetRecord.updatedAt = new Date(); // Update the timestamp

    // Save the changes to the database
    await salesTargetRecord.save();

    return res.status(200).json({
      success: true,
      message: 'Sales targets updated successfully',
    });
  } catch (error) {
    console.error('Error updating sales target:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update sales target',
      error: error.message,
    });
  }
};


// Delete a sales target by ID
exports.deleteSalesTarget = async (req, res) => {
  const { id } = req.params;

  try {
    const targetToDelete = await SalesTarget.findByPk(id);

    if (!targetToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Sales target not found',
      });
    }

    await targetToDelete.destroy();

    return res.status(200).json({
      success: true,
      message: 'Sales target deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete sales target',
      error: error.message,
    });
  }
};
