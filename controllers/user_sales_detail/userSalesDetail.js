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
      let totalStockTarget = 0;

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
            const stockTargetValue = parseFloat(data.stock_target) || 0;
            const duration = data.duration ? data.duration.toLowerCase() : '';

            // Convert target to a monthly equivalent if needed
            if (duration.includes('month')) {
              // const months = parseInt(duration) || 1; 
              const months = duration.includes('month') ? parseInt(duration) || 1 : 1;
              totalMonthlyTarget += targetValue / months;
              totalStockTarget += stockTargetValue / months;
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

      //
      const totalStockAchievement = acceptedOrders.reduce((total, order) => {
        return total + order.OrderItems.reduce((subtotal, item) => subtotal + (parseInt(item.quantity) || 0), 0);
      }, 0);

      // Calculate pending amount
      const pendingAmount = totalMonthlyTarget - totalAchievementAmount;
      const pendingStockTarget = totalStockTarget - totalStockAchievement;

      // Calculate achievement and unachievement percentages
      const achievementAmountPercent =
        totalMonthlyTarget > 0 ? (totalAchievementAmount / totalMonthlyTarget) * 100 : 0;
      const unachievementAmountPercent = 100 - achievementAmountPercent;

      // Add current month's details to the result
      monthlyDetails.push({
        month: startOfMonth.toLocaleString('default', { month: 'long' }),
        year: startOfMonth.getFullYear(),
        MonthlyTargetAmount:totalMonthlyTarget,
        AchievementAmount:totalAchievementAmount,
        pendingAmount,
        achievementAmountPercent: achievementAmountPercent.toFixed(2),
        unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
        //stock:
        StockTarget: totalStockTarget,
        StockAchievement: totalStockAchievement,
        PendingStockTarget: pendingStockTarget,
        StockAchievementPercent: totalStockTarget > 0 ? ((totalStockAchievement / totalStockTarget) * 100).toFixed(2) : '0.00',
        StockUnachievementPercent: totalStockTarget > 0 ? (100 - (totalStockAchievement / totalStockTarget) * 100).toFixed(2) : '100.00',
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


////////*******************///////////
////////*******************///////////



// const { SalesTarget, Order, Product, OrderItem, User } = require('../../models');
// const { Op } = require('sequelize');





exports.getLowHierarchySalesDetails = async (req, res) => {
  const { user_id } = req.params;

  try {
    const lowerHierarchyUsers = await User.findAll({
      where: {
        superior_id: user_id,
        role_name: { [Op.ne]: 'Customer' }
      },
    });

    if (!lowerHierarchyUsers || lowerHierarchyUsers.length === 0) {
      return res.status(404).json({ success: false, message: 'No lower hierarchy users found' });
    }

    const result = [];

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

        // Fetch sales targets for the role
        const salesTargets = await SalesTarget.findAll();
        salesTargets.forEach((target) => {
          let productData;
          if (typeof target.product_data === 'string') {
            productData = JSON.parse(target.product_data);
          } else {
            productData = target.product_data;
          }

          productData.forEach((data) => {
            if (data.role === role) {
              const targetValue = parseFloat(data.target) || 0;
              const stockTargetValue = parseFloat(data.stock_target) || 0;
              const duration = data.duration ? data.duration.toLowerCase() : '';

              // Calculate monthly target and stock target based on duration
              if (duration.includes('month')) {
                const months = parseInt(duration) || 1;
                totalMonthlyTarget += targetValue / months;
                totalStockTarget += stockTargetValue / months;
              }
            }
          });
        });

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
          const user = await User.findByPk(order.higher_role_id);
          const roleName = user ? user.role_name : '';

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
            }

            const orderTotal = price * (parseInt(orderItem.quantity) || 0);
            totalAchievementAmount += orderTotal;
            totalStockAchievement += parseInt(orderItem.quantity) || 0;
          }
        }

        // Calculate percentages
        const achievementAmountPercent =
          totalMonthlyTarget > 0 ? (totalAchievementAmount / totalMonthlyTarget) * 100 : 0;
        const unachievementAmountPercent = 100 - achievementAmountPercent;

        const stockAchievementPercent =
          totalStockTarget > 0 ? (totalStockAchievement / totalStockTarget) * 100 : 0;
        const stockUnachievementPercent = 100 - stockAchievementPercent;

        const pendingStockTarget = totalStockTarget - totalStockAchievement;

        monthlyDetails.push({
          month: startOfMonth.toLocaleString('default', { month: 'long' }),
          year: startOfMonth.getFullYear(),
          totalMonthlyTarget,
          totalAchievementAmount,
          pendingAmount: totalMonthlyTarget - totalAchievementAmount,
          achievementAmountPercent: achievementAmountPercent.toFixed(2),
          unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
          totalStockTarget,
          totalStockAchievement,
          pendingStockTarget: pendingStockTarget,  
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

