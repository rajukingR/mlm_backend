const { Order, Product, OrderItem, User, SalesStockTarget } = require('../../models');
const { Op } = require('sequelize');

exports.getOverallSalesCalculation = async (req, res) => {
    try {
      const roles = ['Area Development Officer', 'Master Distributor', 'Super Distributor', 'Distributor'];
      const result = [];
  
      for (const role of roles) {
        // Fetch users by role
        const users = await User.findAll({
          where: { role_name: role },
        });
  
        const totalUsers = users.length;
  
        // Fetch role-specific sales and stock targets
        const roleTarget = await SalesStockTarget.findOne({
          where: { role_name: role },
        });
  
        const targetAmount = parseFloat(roleTarget?.target || 0) * totalUsers;
        const targetStock = parseFloat(roleTarget?.stock_target || 0) * totalUsers;
  
        // Fetch accepted orders for users in this role
        const orders = await Order.findAll({
          where: {
            higher_role_id: users.map((user) => user.id),
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
  
        // Calculate achieved sales amount and stock
        let totalSalesAmount = 0;
        let totalStockAchieved = 0;
  
        for (const order of orders) {
          for (const orderItem of order.OrderItems) {
            const product = orderItem.product;
            let price = 0;
  
            // Determine price based on role
            switch (role) {
              case 'Area Development Officer':
                price = product.adoPrice || 0;
                break;
              case 'Master Distributor':
                price = product.mdPrice || 0;
                break;
              case 'Super Distributor':
                price = product.sdPrice || 0;
                break;
              case 'Distributor':
                price = product.distributorPrice || 0;
                break;
            }
  
            totalSalesAmount += price * (parseInt(orderItem.quantity) || 0);
            totalStockAchieved += parseInt(orderItem.quantity) || 0;
          }
        }
  
        // Calculate pending amounts and percentages
        const pendingAmount = Math.max(targetAmount - totalSalesAmount, 0);
        const pendingStock = Math.max(targetStock - totalStockAchieved, 0);
  
        const salesAchievementPercent = Math.min(
          Math.max(targetAmount > 0 ? (totalSalesAmount / targetAmount) * 100 : 0, 0),
          100
        );
        const stockAchievementPercent = Math.min(
          Math.max(targetStock > 0 ? (totalStockAchieved / targetStock) * 100 : 0, 0),
          100
        );
  
        result.push({
          roleName: role,
          totalUsers,
          targetAmount,
          targetStock,
          totalSalesAmount,
          totalStockAchieved,
          pendingAmount,
          pendingStock,
          salesAchievementPercent: salesAchievementPercent.toFixed(2),
          stockAchievementPercent: stockAchievementPercent.toFixed(2),
        });
      }
  
      return res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      console.error('Error calculating overall sales:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to calculate overall sales',
        error: error.message,
      });
    }
  };
  