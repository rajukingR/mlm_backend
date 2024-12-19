const { Order, Product, OrderItem, User, SalesStockTarget } = require('../../models');
const { Op } = require('sequelize');

exports.getMonthlySalesDetails = async (req, res) => {
  const { role_id, user_id } = req.params;

  try {
    // Fetch user details for creation date
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const userCreatedAt = new Date(user.createdAt);
    const currentDate = new Date();

    // Fetch SalesStockTarget based on user's role_name
    const roleTarget = await SalesStockTarget.findOne({
      where: {
        role_name: user.role_name,
      },
    });

    if (!roleTarget) {
      return res.status(404).json({ success: false, message: 'Role target not found' });
    }

    const totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
    const totalStockTarget = parseFloat(roleTarget.stock_target) || 0;

    // Initialize results
    const monthlyDetails = [];

    // Helper function to iterate month-by-month
    const getMonthsBetweenDates = (start, end) => {
      const months = [];
      const current = new Date(start);
      while (current <= end) {
        months.push(new Date(current));
        current.setMonth(current.getMonth() + 1);
      }
      return months;
    };

    const months = getMonthsBetweenDates(userCreatedAt, currentDate);

    for (const targetDate of months) {
      const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
      const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

      // Fetch all accepted orders for the user within the target month
      const acceptedOrders = await Order.findAll({
        where: {
          higher_role_id: user_id,
          status: 'Accepted',
          created_at: { [Op.between]: [startOfMonth, endOfMonth] },
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
      let totalAchievementAmount = 0;
      for (const order of acceptedOrders) {
        const orderUser = await User.findByPk(order.higher_role_id);
        const roleName = orderUser ? orderUser.role_name : '';

        for (const orderItem of order.OrderItems) {
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

          totalAchievementAmount += price * (parseInt(orderItem.quantity) || 0);
        }
      }

      // Calculate total stock achievement
      const totalStockAchievement = acceptedOrders.reduce((total, order) => {
        return total + order.OrderItems.reduce((subtotal, item) => subtotal + (parseInt(item.quantity) || 0), 0);
      }, 0);

      // Ensure no negative values
      const pendingAmount = Math.max(0, totalMonthlyTarget - totalAchievementAmount);
      const pendingStockTarget = Math.max(0, totalStockTarget - totalStockAchievement);

      // Calculate percentages capped between 0 and 100
      const achievementAmountPercent = Math.min(100, Math.max(0, (totalAchievementAmount / totalMonthlyTarget) * 100));
      const unachievementAmountPercent = 100 - achievementAmountPercent;

      const stockAchievementPercent = Math.min(100, Math.max(0, (totalStockAchievement / totalStockTarget) * 100));
      const stockUnachievementPercent = 100 - stockAchievementPercent;

      // Add current month's details to the result
      monthlyDetails.push({
        month: startOfMonth.toLocaleString('default', { month: 'long' }),
        year: startOfMonth.getFullYear(),
        MonthlyTargetAmount: totalMonthlyTarget,
        AchievementAmount: totalAchievementAmount,
        pendingAmount: pendingAmount,
        achievementAmountPercent: achievementAmountPercent.toFixed(2),
        unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
        StockTarget: totalStockTarget,
        StockAchievement: totalStockAchievement,
        PendingStockTarget: pendingStockTarget,
        StockAchievementPercent: stockAchievementPercent.toFixed(2),
        StockUnachievementPercent: stockUnachievementPercent.toFixed(2),
      });
    }

    // Respond with the monthly details
    return res.status(200).json({
      success: true,
      role: user.role_name,
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







exports.getLowHierarchySalesDetails = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Fetch users under the given user_id (lower hierarchy)
    const lowerHierarchyUsers = await User.findAll({
      where: {
        superior_id: user_id,
        role_name: { [Op.ne]: 'Customer' },
      },
    });

    if (!lowerHierarchyUsers || lowerHierarchyUsers.length === 0) {
      return res.status(404).json({ success: false, message: 'No lower hierarchy users found' });
    }

    const result = [];

    // Iterate over each lower hierarchy user
    for (const user of lowerHierarchyUsers) {
      const role = user.role_name;
      const photo = user.image;
      const userCreatedAt = new Date(user.createdAt);
      const currentDate = new Date();

      let totalMonthlyTarget = 0;
      let totalStockTarget = 0;
      const monthlyDetails = [];

      let targetDate = new Date(userCreatedAt);
      while (targetDate <= currentDate) {
        const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
        const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

        // Fetch the SalesStockTarget for the current user's role
        const roleTarget = await SalesStockTarget.findOne({
          where: { role_name: role },
        });

        if (roleTarget) {
          totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
          totalStockTarget = parseFloat(roleTarget.stock_target) || 0;
        }

        // Fetch accepted orders for the user within the month
        const acceptedOrders = await Order.findAll({
          where: {
            higher_role_id: user.id,
            status: 'Accepted',
            created_at: { [Op.between]: [startOfMonth, endOfMonth] },
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

        // Calculate total achievement amount and stock achievement
        let totalAchievementAmount = 0;
        let totalStockAchievement = 0;

        for (const order of acceptedOrders) {
          for (const orderItem of order.OrderItems) {
            const product = orderItem.product;
            let price = 0;

            switch (role) {
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
            }

            totalAchievementAmount += price * (parseInt(orderItem.quantity) || 0);
            totalStockAchievement += parseInt(orderItem.quantity) || 0;
          }
        }

        // Calculate percentages and ensure they're within valid bounds
        const achievementAmountPercent = Math.min(
          Math.max(totalMonthlyTarget > 0 ? (totalAchievementAmount / totalMonthlyTarget) * 100 : 0, 0),
          100
        );
        const unachievementAmountPercent = Math.min(100 - achievementAmountPercent, 100);

        const stockAchievementPercent = Math.min(
          Math.max(totalStockTarget > 0 ? (totalStockAchievement / totalStockTarget) * 100 : 0, 0),
          100
        );
        const stockUnachievementPercent = Math.min(100 - stockAchievementPercent, 100);

        const pendingAmount = Math.max(totalMonthlyTarget - totalAchievementAmount, 0);
        const pendingStockTarget = Math.max(totalStockTarget - totalStockAchievement, 0);

        monthlyDetails.push({
          month: startOfMonth.toLocaleString('default', { month: 'long' }),
          year: startOfMonth.getFullYear(),
          totalMonthlyTarget,
          totalAchievementAmount,
          pendingAmount,
          achievementAmountPercent: achievementAmountPercent.toFixed(2),
          unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
          totalStockTarget,
          totalStockAchievement,
          pendingStockTarget,
          stockAchievementPercent: stockAchievementPercent.toFixed(2),
          stockUnachievementPercent: stockUnachievementPercent.toFixed(2),
          roleName: role,
          roleId: user.role_id,
        });

        targetDate.setMonth(targetDate.getMonth() + 1);
      }

      result.push({
        user_id: user.id,
        full_name: user.full_name,
        image: photo,
        monthlyDetails,
      });
    }

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Error fetching lower hierarchy sales details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch sales details',
      error: error.message,
    });
  }
};



///****** User Sales Detail *******///

exports.getUserCurrentMonthSalesDetailsId = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Fetch the user details for the given user_id
    const user = await User.findOne({
      where: {
        id: user_id,
        role_name: { [Op.ne]: 'Customer' },  // Ensure the user is not a customer
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const role = user.role_name;
    const photo = user.image;
    const userCreatedAt = new Date(user.createdAt);
    const currentDate = new Date();

    let totalMonthlyTarget = 0;
    let totalStockTarget = 0;
    const monthlyDetails = [];

    // Focus only on the current month
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Fetch the SalesStockTarget for the current user's role
    const roleTarget = await SalesStockTarget.findOne({
      where: { role_name: role },
    });

    if (roleTarget) {
      totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
      totalStockTarget = parseFloat(roleTarget.stock_target) || 0;
    }

    // Fetch accepted orders for the user within the current month
    const acceptedOrders = await Order.findAll({
      where: {
        higher_role_id: user.id,
        status: 'Accepted',
        created_at: { [Op.between]: [startOfMonth, endOfMonth] },
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

    // Calculate total achievement amount and stock achievement for the current month
    let totalAchievementAmount = 0;
    let totalStockAchievement = 0;

    for (const order of acceptedOrders) {
      for (const orderItem of order.OrderItems) {
        const product = orderItem.product;
        let price = 0;

        switch (role) {
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
        }

        totalAchievementAmount += price * (parseInt(orderItem.quantity) || 0);
        totalStockAchievement += parseInt(orderItem.quantity) || 0;
      }
    }

    // Calculate percentages and ensure they're within valid bounds
    const achievementAmountPercent = Math.min(
      Math.max(totalMonthlyTarget > 0 ? (totalAchievementAmount / totalMonthlyTarget) * 100 : 0, 0),
      100
    );
    const unachievementAmountPercent = Math.min(100 - achievementAmountPercent, 100);

    const stockAchievementPercent = Math.min(
      Math.max(totalStockTarget > 0 ? (totalStockAchievement / totalStockTarget) * 100 : 0, 0),
      100
    );
    const stockUnachievementPercent = Math.min(100 - stockAchievementPercent, 100);

    const pendingAmount = Math.max(totalMonthlyTarget - totalAchievementAmount, 0);
    const pendingStockTarget = Math.max(totalStockTarget - totalStockAchievement, 0);

    monthlyDetails.push({
      month: startOfMonth.toLocaleString('default', { month: 'long' }),
      year: startOfMonth.getFullYear(),
      totalMonthlyTarget,
      totalAchievementAmount,
      pendingAmount,
      achievementAmountPercent: achievementAmountPercent.toFixed(2),
      unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
      totalStockTarget,
      totalStockAchievement,
      pendingStockTarget,
      stockAchievementPercent: stockAchievementPercent.toFixed(2),
      stockUnachievementPercent: stockUnachievementPercent.toFixed(2),
      roleName: role,
      roleId: user.role_id,
    });

    return res.status(200).json({
      success: true,
      user_id: user.id,
      full_name: user.full_name,
      image: photo,
      monthlyDetails,
    });

  } catch (error) {
    console.error('Error fetching current month sales details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch sales details',
      error: error.message,
    });
  }
};












// const { Order, Product, OrderItem, User, SalesStockTarget } = require('../../models');
// const { Op } = require('sequelize');

// exports.getMonthlySalesDetails = async (req, res) => {
//   const { role_id, user_id } = req.params;

//   try {
//     // Fetch user details for creation date
//     const user = await User.findByPk(user_id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const userCreatedAt = new Date(user.createdAt);
//     const currentDate = new Date();

//     // Fetch SalesStockTarget based on user's role_name
//     const roleTarget = await SalesStockTarget.findOne({
//       where: {
//         role_name: user.role_name,
//       },
//     });

//     if (!roleTarget) {
//       return res.status(404).json({ success: false, message: 'Role target not found' });
//     }

//     const totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
//     const totalStockTarget = parseFloat(roleTarget.stock_target) || 0;

//     // Initialize results
//     const monthlyDetails = [];

//     // Iterate month-by-month from userCreatedAt to the current month
//     let targetDate = new Date(userCreatedAt);
//     while (targetDate <= currentDate) {
//       const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
//       const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

//       // Fetch all accepted orders for the user within the target month
//       const acceptedOrders = await Order.findAll({
//         where: {
//           higher_role_id: user_id,
//           status: 'Accepted',
//           created_at: { [Op.between]: [startOfMonth, endOfMonth] }, // Filter by month range
//         },
//         include: [
//           {
//             model: OrderItem,
//             as: 'OrderItems',
//             include: {
//               model: Product,
//               as: 'product',
//               required: true,
//             },
//           },
//         ],
//       });

//       // Calculate total achievement amount
//       const totalAchievementAmount = await acceptedOrders.reduce(async (totalPromise, order) => {
//         let total = await totalPromise;

//         const user = await User.findByPk(order.higher_role_id);
//         const roleName = user ? user.role_name : '';

//         order.OrderItems.forEach((orderItem) => {
//           const product = orderItem.product;

//           let price = 0;
//           switch (roleName) {
//             case 'Super Distributor':
//               price = product.sdPrice || 0;
//               break;
//             case 'Distributor':
//               price = product.distributorPrice || 0;
//               break;
//             case 'Master Distributor':
//               price = product.mdPrice || 0;
//               break;
//             case 'Area Development Officer':
//               price = product.adoPrice || 0;
//               break;
//             case 'Customer':
//               price = product.price || 0;
//               break;
//             default:
//               price = 0;
//               break;
//           }

//           const orderTotal = price * (parseInt(orderItem.quantity) || 0);
//           total += orderTotal;
//         });

//         return total;
//       }, Promise.resolve(0));

//       // Calculate total stock achievement
//       const totalStockAchievement = acceptedOrders.reduce((total, order) => {
//         return total + order.OrderItems.reduce((subtotal, item) => subtotal + (parseInt(item.quantity) || 0), 0);
//       }, 0);

//       // Calculate pending amount
//       const pendingAmount = totalMonthlyTarget - totalAchievementAmount;
//       const pendingStockTarget = totalStockTarget - totalStockAchievement;

//       // Calculate achievement and unachievement percentages
//       const achievementAmountPercent =
//         totalMonthlyTarget > 0 ? (totalAchievementAmount / totalMonthlyTarget) * 100 : 0;
//       const unachievementAmountPercent = 100 - achievementAmountPercent;

//       // Add current month's details to the result
//       monthlyDetails.push({
//         month: startOfMonth.toLocaleString('default', { month: 'long' }),
//         year: startOfMonth.getFullYear(),
//         MonthlyTargetAmount: totalMonthlyTarget,
//         AchievementAmount: totalAchievementAmount,
//         pendingAmount,
//         achievementAmountPercent: achievementAmountPercent.toFixed(2),
//         unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
//         StockTarget: totalStockTarget,
//         StockAchievement: totalStockAchievement,
//         PendingStockTarget: pendingStockTarget,
//         // StockAchievementPercent: totalStockTarget > 0 ? ((totalStockAchievement / totalStockTarget) * 100).toFixed(2) : '0.00',
//         StockAchievementPercent: totalStockTarget > 0 ? ((totalStockAchievement / totalStockTarget) * 100).toFixed(4) : '0.0000',

//         StockUnachievementPercent: totalStockTarget > 0 ? (100 - (totalStockAchievement / totalStockTarget) * 100).toFixed(2) : '100.00',
//       });

//       // Move to the next month
//       targetDate.setMonth(targetDate.getMonth() + 1);
//     }

//     // Respond with the monthly details
//     return res.status(200).json({
//       success: true,
//       role: user.role_name,
//       user_id,
//       monthlyDetails,
//     });
//   } catch (error) {
//     console.error('Error fetching monthly sales details:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch monthly sales details',
//       error: error.message,
//     });
//   }
// };


////////*******************///////////
////////*******************///////////



// const { SalesTarget, Order, Product, OrderItem, User } = require('../../models');
// const { Op } = require('sequelize');





// exports.getLowHierarchySalesDetails = async (req, res) => {
//   const { user_id } = req.params;

//   try {
//     // Fetch users under the given user_id (lower hierarchy)
//     const lowerHierarchyUsers = await User.findAll({
//       where: {
//         superior_id: user_id,
//         role_name: { [Op.ne]: 'Customer' }
//       },
//     });

//     if (!lowerHierarchyUsers || lowerHierarchyUsers.length === 0) {
//       return res.status(404).json({ success: false, message: 'No lower hierarchy users found' });
//     }

//     const result = [];

//     // Iterate over each lower hierarchy user
//     for (const user of lowerHierarchyUsers) {
//       const role = user.role_name;
//       const photo = user.image;
//       const userCreatedAt = new Date(user.createdAt);
//       const currentDate = new Date();

//       let totalMonthlyTarget = 0;
//       let totalStockTarget = 0;
//       const monthlyDetails = [];

//       let targetDate = new Date(userCreatedAt);
//       while (targetDate <= currentDate) {
//         const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
//         const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

//         // Fetch the SalesStockTarget for the current user's role
//         const roleTarget = await SalesStockTarget.findOne({
//           where: {
//             role_name: role,
//           },
//         });

//         if (roleTarget) {
//           totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
//           totalStockTarget = parseFloat(roleTarget.stock_target) || 0;
//         } else {
//           totalMonthlyTarget = 0;
//           totalStockTarget = 0;
//         }

//         // Fetch accepted orders for the user within the month
//         const acceptedOrders = await Order.findAll({
//           where: {
//             higher_role_id: user.id,
//             status: 'Accepted',
//             created_at: { [Op.between]: [startOfMonth, endOfMonth] },
//           },
//           include: [
//             {
//               model: OrderItem,
//               as: 'OrderItems',
//               include: {
//                 model: Product,
//                 as: 'product',
//                 required: true,
//               },
//             },
//           ],
//         });

//         // Calculate total achievement amount and stock achievement
//         let totalAchievementAmount = 0;
//         let totalStockAchievement = 0;

//         for (const order of acceptedOrders) {
//           const user = await User.findByPk(order.higher_role_id);
//           const roleName = user ? user.role_name : '';

//           for (const orderItem of order.OrderItems) {
//             const product = orderItem.product;
//             let price = 0;

//             switch (roleName) {
//               case 'Super Distributor':
//                 price = product.sdPrice || 0;
//                 break;
//               case 'Distributor':
//                 price = product.distributorPrice || 0;
//                 break;
//               case 'Master Distributor':
//                 price = product.mdPrice || 0;
//                 break;
//               case 'Area Development Officer':
//                 price = product.adoPrice || 0;
//                 break;
//             }

//             const orderTotal = price * (parseInt(orderItem.quantity) || 0);
//             totalAchievementAmount += orderTotal;
//             totalStockAchievement += parseInt(orderItem.quantity) || 0;
//           }
//         }

//         // Calculate percentages
//         const achievementAmountPercent =
//           totalMonthlyTarget > 0 ? (totalAchievementAmount / totalMonthlyTarget) * 100 : 0;
//         const unachievementAmountPercent = 100 - achievementAmountPercent;

//         const stockAchievementPercent =
//           totalStockTarget > 0 ? (totalStockAchievement / totalStockTarget) * 100 : 0;
//         const stockUnachievementPercent = 100 - stockAchievementPercent;

//         const pendingStockTarget = totalStockTarget - totalStockAchievement;

//         monthlyDetails.push({
//           month: startOfMonth.toLocaleString('default', { month: 'long' }),
//           year: startOfMonth.getFullYear(),
//           totalMonthlyTarget,
//           totalAchievementAmount,
//           pendingAmount: totalMonthlyTarget - totalAchievementAmount,
//           achievementAmountPercent: achievementAmountPercent.toFixed(2),
//           unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
//           totalStockTarget,
//           totalStockAchievement,
//           pendingStockTarget: pendingStockTarget,
//           stockAchievementPercent: stockAchievementPercent.toFixed(2),
//           stockUnachievementPercent: stockUnachievementPercent.toFixed(2),
//           roleName: role,
//           roleId: user.role_id,
//         });

//         targetDate.setMonth(targetDate.getMonth() + 1);
//       }

//       result.push({
//         user_id: user.id,
//         full_name: user.full_name,
//         image: photo,
//         monthlyDetails,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.error('Error fetching lower hierarchy sales details:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch sales details',
//       error: error.message,
//     });
//   }
// };
