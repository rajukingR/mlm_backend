const { SalesTarget } = require('../../models');

exports.getSalesTargetByRole = async (req, res) => {
    const { role } = req.params;
  
    try {
      // Fetch sales targets with the specified role
      const salesTargets = await SalesTarget.findAll({
        where: { role }
      });
  
      if (!salesTargets || salesTargets.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No sales targets found for the specified role',
        });
      }
  
      // Extract target values from productData field without JSON.parse
      const targets = salesTargets.flatMap((target) => {
        // Assuming productData is already parsed as an array of objects
        return target.productData.map((product) => product.target); // Return only the target value from each product
      });
  
      return res.status(200).json({
        success: true,
        role,
        targets,
      });
    } catch (error) {
      console.error('Error fetching sales targets by role:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch sales targets',
        error: error.message,
      });
    }
  };
  