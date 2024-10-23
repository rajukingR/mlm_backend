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
  
    if (!targets || !Array.isArray(targets)) {
      return res.status(400).json({
        success: false,
        message: 'Targets must be an array and is required.',
      });
    }
  
    try {
      const createdTargets = [];
  
      for (const target of targets) {
        const { role, virginCoconutOil, virginCoconutHairOil } = target;
  
        // Validate required fields
        if (!role || !virginCoconutOil?.target || !virginCoconutOil?.duration ||
            !virginCoconutHairOil?.target || !virginCoconutHairOil?.duration) {
          return res.status(400).json({
            success: false,
            message: 'Role, target, and duration are required for both products.',
          });
        }
  
        // Create entries in the database
        const oilTarget = await SalesTarget.create({
          role,
          productType: 'Virgin Coconut Oil',
          target: parseFloat(virginCoconutOil.target),
          duration: virginCoconutOil.duration,
        });
  
        const hairOilTarget = await SalesTarget.create({
          role,
          productType: 'Virgin Coconut Hair Oil',
          target: parseFloat(virginCoconutHairOil.target),
          duration: virginCoconutHairOil.duration,
        });
  
        createdTargets.push({ oilTarget, hairOilTarget });
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
  
// Update a sales target by ID
exports.updateSalesTarget = async (req, res) => {
  const { id } = req.params;
  const { role, target, duration } = req.body;

  try {
    const targetToUpdate = await SalesTarget.findByPk(id);

    if (!targetToUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Sales target not found',
      });
    }

    // Update sales target details
    targetToUpdate.role = role || targetToUpdate.role;
    targetToUpdate.target = target !== undefined ? target : targetToUpdate.target;
    targetToUpdate.duration = duration || targetToUpdate.duration;

    await targetToUpdate.save();

    return res.status(200).json({
      success: true,
      message: 'Sales target updated successfully',
      data: targetToUpdate,
    });
  } catch (error) {
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
