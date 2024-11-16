const { SalesTarget, Order, Product, OrderItem, User } = require('../../models');

exports.getSalesTargetAndAchievement = async (req, res) => {
  const { role, user_id } = req.params;

  try {
    // Fetch sales targets for all roles
    const salesTargets = await SalesTarget.findAll();

    if (!salesTargets || salesTargets.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No sales targets found',
      });
    }

    // Calculate the total monthly target
    let totalMonthlyTarget = 0;

    salesTargets.forEach((target) => {
      let productData;

      // Parse product_data based on its actual type
      if (typeof target.product_data === 'string') {
        productData = JSON.parse(target.product_data); // Parse if it's a JSON string
      } else {
        productData = target.product_data; // Use directly if it's already JSON
      }

      productData.forEach((data) => {
        if (data.role === role) {
          const targetValue = parseFloat(data.target) || 0;
          const duration = data.duration ? data.duration.toLowerCase() : '';

          // Convert target to a monthly equivalent if needed
          if (duration.includes('month')) {
            const months = parseInt(duration) || 1; // Extract number of months
            totalMonthlyTarget += targetValue / months; // Calculate per-month target
          }
        }
      });
    });

    // Fetch all accepted orders for the specified user
    const acceptedOrders = await Order.findAll({
      where: {
        higher_role_id: user_id,
        status: 'Accepted',
      },
      include: [
        {
          model: OrderItem,
          as: 'OrderItems',
          include: {
            model: Product,
            as: 'product',
            required: true,
          },
        },
      ],
    });

    // Calculate total achievement amount
    const totalAchievementAmount = await acceptedOrders.reduce(async (totalPromise, order) => {
      let total = await totalPromise;

      // Fetch the role name for the higher_role_id
      const user = await User.findByPk(order.higher_role_id);
      const roleName = user ? user.role_name : '';

      order.OrderItems.forEach((orderItem) => {
        const product = orderItem.product; // Get product data

        let price = 0;
        switch (roleName) {
          case 'Super Distributor':
            price = product.sdPrice || 0;
            break;
          case 'Distributor':
            price = product.distributorPrice || 0;
            break;
          case 'Master Distributor':
            price = product.mdPrice || 0;
            break;
          case 'Area Development Officer':
            price = product.adoPrice || 0;
            break;
          case 'Customer':
            price = product.price || 0;
            break;
          default:
            price = 0;
            break;
        }

        // Calculate the total amount for the order (price * quantity)
        const orderTotal = price * (parseInt(orderItem.quantity) || 0);
        total += orderTotal;
      });

      return total;
    }, Promise.resolve(0));

    // Calculate the pending amount
    const pendingAmount = totalMonthlyTarget - totalAchievementAmount;

    // Calculate the achievement percentage
let achievementAmountPercent = 0;
if (totalMonthlyTarget > 0) {
  achievementAmountPercent = (totalAchievementAmount / totalMonthlyTarget) * 100;
}

// Calculate the unachievement percentage
let unachievementAmountPercent = 100 - achievementAmountPercent;


    // Respond with combined data
    return res.status(200).json({
      success: true,
      role,
      user_id,
      totalMonthlyTarget,
      totalAchievementAmount,
      pendingAmount,
      achievementAmountPercent: achievementAmountPercent.toFixed(2),
      unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
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


























// const { SalesTarget, Order, Product, OrderItem, User } = require('../../models');

// exports.getSalesTargetAndAchievement = async (req, res) => {
//   const { role, user_id } = req.params;

//   try {
//     // Fetch all sales targets for the specified role
//     const salesTargets = await SalesTarget.findAll({
//       where: { role }
//     });

//     // If no sales targets found
//     if (!salesTargets || salesTargets.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'No sales targets found for the specified role',
//       });
//     }

//     // Calculate monthly target by aggregating values based on 'duration'
//     let totalMonthlyTarget = 0;

//     salesTargets.forEach((target) => {
//       target.productData.forEach((product) => {
//         const targetValue = parseFloat(product.target) || 0;
//         const duration = product.duration ? product.duration.toLowerCase() : "";

//         // Convert target to a monthly equivalent if needed
//         if (duration.includes("month")) {
//           const months = parseInt(duration); // Get the number of months from duration
//           totalMonthlyTarget += targetValue / (months || 1); // Calculate per month target
//         }
//       });
//     });

//     // Fetch all accepted orders for the specified user role and user_id
//     const acceptedOrders = await Order.findAll({
//       where: {
//         higher_role_id: user_id,
//         status: 'Accepted'
//       },
//       include: [
//         {
//           model: OrderItem, // Include OrderItems for each order
//           as: 'OrderItems',
//           include: {
//             model: Product, // Include Product data in OrderItems
//             as: 'product',
//             required: true,
//           },
//         }
//       ],
//     });

//     // Fetch role names for all unique higher_role_id values
//     const higherRoleIds = acceptedOrders.map(order => order.higher_role_id);
//     const userRoles = await User.findAll({
//       where: { id: higherRoleIds },
//       attributes: ['id', 'role_name'],
//     });

//     const roleMap = {};
//     userRoles.forEach(user => {
//       roleMap[user.id] = user.role_name;
//     });

//     // Calculate total achievement amount
//     const totalAchievementAmount = acceptedOrders.reduce((total, order) => {
//       let price = 0;

//       // Determine the role_name from higher_role_id
//       const roleName = roleMap[order.higher_role_id];

//       // Determine the correct price based on roleName
//       order.OrderItems.forEach((orderItem) => {
//         const product = orderItem.product; // Get the product associated with the OrderItem

//         switch (roleName) {
//           case 'Super Distributor':
//             price = product.sdPrice || 0;
//             break;
//           case 'Distributor':
//             price = product.distributorPrice || 0;
//             break;
//           case 'Master Distributor':
//             price = product.mdPrice || 0;
//             break;
//           case 'Area Development Officer':
//             price = product.adoPrice || 0;
//             break;
//           default:
//             price = 0;
//             break;
//         }

//         // Calculate the total amount for the order (price * quantity)
//         const orderTotal = price * (parseInt(orderItem.quantity) || 0);
//         total += orderTotal;
//       });

//       return total;
//     }, 0);

//     // Calculate the pending amount
//     const pendingAmount = totalMonthlyTarget - totalAchievementAmount;

//     // Respond with combined data
//     return res.status(200).json({
//       success: true,
//       role,
//       user_id,
//       totalMonthlyTarget,
//       totalAchievementAmount,
//       pendingAmount
//     });

//   } catch (error) {
//     console.error('Error fetching sales targets and achievement:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch sales targets and achievement',
//       error: error.message,
//     });
//   }
// };