// In userSalesDetail controller
const { SalesTarget, Order } = require('../../models');

exports.getSalesTargetAndAchievement = async (req, res) => {
  const { role, user_id } = req.params;

  try {
    // Fetch all sales targets for the specified role
    const salesTargets = await SalesTarget.findAll({
      where: { role }
    });

    // If no sales targets found
    if (!salesTargets || salesTargets.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No sales targets found for the specified role',
      });
    }

    // Calculate monthly target by aggregating values based on 'duration'
    let totalMonthlyTarget = 0;

    salesTargets.forEach((target) => {
      target.productData.forEach((product) => {
        const targetValue = parseFloat(product.target) || 0;
        const duration = product.duration ? product.duration.toLowerCase() : "";

        // Convert target to a monthly equivalent if needed
        if (duration.includes("month")) {
          const months = parseInt(duration); // Get the number of months from duration
          totalMonthlyTarget += targetValue / (months || 1); // Calculate per month target
        }
      });
    });

    // Fetch all accepted orders for the specified user role
    const acceptedOrders = await Order.findAll({
      where: {
        higher_role_id: user_id,
        status: 'Accepted'
      }
    });

    // Calculate total achievement amount
    const totalAchievementAmount = acceptedOrders.reduce((total, order) => {
      return total + (parseFloat(order.total_amount) || 0);
    }, 0);

    // Calculate the pending amount
    const pendingAmount = totalMonthlyTarget - totalAchievementAmount;

    // Respond with combined data
    return res.status(200).json({
      success: true,
      role,
      user_id,
      totalMonthlyTarget,
      totalAchievementAmount,
      pendingAmount
    });

  } catch (error) {
    console.error('Error fetching sales targets and achievement:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch sales targets and achievement',
      error: error.message,
    });
  }
};












// const { SalesTarget, Order} = require('../../models');

// exports.getSalesTargetByRole = async (req, res) => {
//     const { role } = req.params;
  
//     try {
//       // Fetch sales targets with the specified role
//       const salesTargets = await SalesTarget.findAll({
//         where: { role }
//       });
  
//       if (!salesTargets || salesTargets.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: 'No sales targets found for the specified role',
//         });
//       }
  
//       // Extract target values from productData field without JSON.parse
//       const targets = salesTargets.flatMap((target) => {
//         // Assuming productData is already parsed as an array of objects
//         return target.productData.map((product) => product.target); // Return only the target value from each product
//       });
  
//       return res.status(200).json({
//         success: true,
//         role,
//         targets,
//       });
//     } catch (error) {
//       console.error('Error fetching sales targets by role:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to fetch sales targets',
//         error: error.message,
//       });
//     }
//   };



//   /////////**User Achivement Calculation **//////////
//   exports.calculateAchievement = async (req, res) => {
//     const { user_id } = req.params;
  
//     try {
//       // Fetch all accepted orders for the specified user role
//       const acceptedOrders = await Order.findAll({
//         where: {
//           higher_role_id: user_id, // Filter by higher_role_id matching user_id
//           status: 'Accepted'       // Only accepted orders
//         }
//       });
  
//       // If no orders found, return zero rather than null
//       if (!acceptedOrders || acceptedOrders.length === 0) {
//         return res.status(200).json({
//           message: 'No accepted orders found for this user',
//           user_id,
//           totalAchievementVolume: 0
//         });
//       }
  
//       // Sum up total_order_quantity from orders matching conditions
//       const totalAchievementVolume = acceptedOrders.reduce((total, order) => {
//         // Ensuring value is numeric
//         return total + (parseFloat(order.total_order_quantity) || 0);
//       }, 0);
  
//       // Respond with the calculated achievement
//       return res.status(200).json({
//         message: 'Achievement Data',
//         user_id,
//         totalAchievementVolume
//       });
  
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
//   };
  