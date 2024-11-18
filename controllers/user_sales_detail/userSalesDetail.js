const { SalesTarget, Order, Product, OrderItem, User } = require('../../models');
const { Op } = require('sequelize');

exports.getMonthlySalesDetails = async (req, res) => {
  const { role, user_id } = req.params;

  try {
    // Fetch user details for creation date
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const userCreatedAt = new Date(user.createdAt);
    const currentDate = new Date();

    // Initialize results
    const monthlyDetails = [];

    // Iterate month-by-month from userCreatedAt to the current month
    let targetDate = new Date(userCreatedAt);
    while (targetDate <= currentDate) {
      const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
      const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

      // Fetch sales targets for all roles
      const salesTargets = await SalesTarget.findAll();
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

      // Fetch all accepted orders for the user within the target month
      const acceptedOrders = await Order.findAll({
        where: {
          higher_role_id: user_id,
          status: 'Accepted',
          created_at: { [Op.between]: [startOfMonth, endOfMonth] }, // Filter by month range
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

        const user = await User.findByPk(order.higher_role_id);
        const roleName = user ? user.role_name : '';

        order.OrderItems.forEach((orderItem) => {
          const product = orderItem.product;

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

          const orderTotal = price * (parseInt(orderItem.quantity) || 0);
          total += orderTotal;
        });

        return total;
      }, Promise.resolve(0));

      // Calculate pending amount
      const pendingAmount = totalMonthlyTarget - totalAchievementAmount;

      // Calculate achievement and unachievement percentages
      const achievementAmountPercent =
        totalMonthlyTarget > 0 ? (totalAchievementAmount / totalMonthlyTarget) * 100 : 0;
      const unachievementAmountPercent = 100 - achievementAmountPercent;

      // Add current month's details to the result
      monthlyDetails.push({
        month: startOfMonth.toLocaleString('default', { month: 'long' }),
        year: startOfMonth.getFullYear(),
        totalMonthlyTarget,
        totalAchievementAmount,
        pendingAmount,
        achievementAmountPercent: achievementAmountPercent.toFixed(2),
        unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
      });

      // Move to the next month
      targetDate.setMonth(targetDate.getMonth() + 1);
    }

    // Respond with the monthly details
    return res.status(200).json({
      success: true,
      role,
      user_id,
      monthlyDetails,
    });
  } catch (error) {
    console.error('Error fetching monthly sales details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch monthly sales details',
      error: error.message,
    });
  }
};











// const { SalesTarget, Order, Product, OrderItem, User } = require('../../models');

// exports.getSalesTargetAndAchievement = async (req, res) => {
//   const { role, user_id } = req.params;

//   try {
//     // Fetch sales targets for all roles
//     const salesTargets = await SalesTarget.findAll();

//     if (!salesTargets || salesTargets.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'No sales targets found',
//       });
//     }

//     // Calculate the total monthly target
//     let totalMonthlyTarget = 0;

//     salesTargets.forEach((target) => {
//       let productData;

//       // Parse product_data based on its actual type
//       if (typeof target.product_data === 'string') {
//         productData = JSON.parse(target.product_data); // Parse if it's a JSON string
//       } else {
//         productData = target.product_data; // Use directly if it's already JSON
//       }

//       productData.forEach((data) => {
//         if (data.role === role) {
//           const targetValue = parseFloat(data.target) || 0;
//           const duration = data.duration ? data.duration.toLowerCase() : '';

//           // Convert target to a monthly equivalent if needed
//           if (duration.includes('month')) {
//             const months = parseInt(duration) || 1; // Extract number of months
//             totalMonthlyTarget += targetValue / months; // Calculate per-month target
//           }
//         }
//       });
//     });

//     // Fetch all accepted orders for the specified user
//     const acceptedOrders = await Order.findAll({
//       where: {
//         higher_role_id: user_id,
//         status: 'Accepted',
//       },
//       include: [
//         {
//           model: OrderItem,
//           as: 'OrderItems',
//           include: {
//             model: Product,
//             as: 'product',
//             required: true,
//           },
//         },
//       ],
//     });

//     // Calculate total achievement amount
//     const totalAchievementAmount = await acceptedOrders.reduce(async (totalPromise, order) => {
//       let total = await totalPromise;

//       // Fetch the role name for the higher_role_id
//       const user = await User.findByPk(order.higher_role_id);
//       const roleName = user ? user.role_name : '';

//       order.OrderItems.forEach((orderItem) => {
//         const product = orderItem.product; // Get product data

//         let price = 0;
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
//           case 'Customer':
//             price = product.price || 0;
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
//     }, Promise.resolve(0));

//     // Calculate the pending amount
//     const pendingAmount = totalMonthlyTarget - totalAchievementAmount;

//     // Calculate the achievement percentage
// let achievementAmountPercent = 0;
// if (totalMonthlyTarget > 0) {
//   achievementAmountPercent = (totalAchievementAmount / totalMonthlyTarget) * 100;
// }

// // Calculate the unachievement percentage
// let unachievementAmountPercent = 100 - achievementAmountPercent;


//     // Respond with combined data
//     return res.status(200).json({
//       success: true,
//       role,
//       user_id,
//       totalMonthlyTarget,
//       totalAchievementAmount,
//       pendingAmount,
//       achievementAmountPercent: achievementAmountPercent.toFixed(2),
//       unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
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