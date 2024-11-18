const { SalesTarget, Order, Product, OrderItem, User, Notification } = require('../../models');
const { Op } = require('sequelize');



exports.getSalesTargetAndAchievement = async (req, res) => {
  const { role, user_id } = req.params;

  try {
    // Fetch sales targets for all roles
    const salesTargets = await SalesTarget.findAll();

    if (!salesTargets || salesTargets.length === 0) {
      return res.status(404).json({
        success: false,        message: 'No sales targets found',
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

    const user = await User.findByPk(user_id);
    const userRoleName = user ? user.role_name : '';

    // Check if the user has not achieved their target
    if (unachievementAmountPercent > 0) {
      // Check the last notification timestamp for the user
      const lastNotification = await Notification.findOne({
        where: { user_id },
        order: [['created_at', 'DESC']], // Get the most recent notification
      });

      if (lastNotification) {
        const lastNotificationTime = new Date(lastNotification.created_at);
        const currentTime = new Date();

        // Calculate the difference in milliseconds (15 days in milliseconds)
        const fifteenDaysInMillis = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
        const timeDifference = currentTime - lastNotificationTime;

        // If the last notification was sent within the last 15 days, don't send another one
        if (timeDifference < fifteenDaysInMillis) {
          return res.status(200).json({
            success: true,
            message: `You have already received a notification within the last 15 days.`,
            role: userRoleName,
            totalMonthlyTarget,
            totalAchievementAmount,
            pendingAmount,
            achievementAmountPercent: achievementAmountPercent.toFixed(2),
            unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
          });
        }
      }

      // Send a notification if it's been more than 15 days
      const message = `You have not achieved your sales target. You have achieved ${achievementAmountPercent.toFixed(
        2
      )}% of your target, leaving ${unachievementAmountPercent.toFixed(2)}% unachieved.`;

      // Insert a notification into the database
      await Notification.create({
        user_id,
        message,
        is_read: false, // Mark as unread
        created_at: new Date(),
      });
    }

    // Respond with combined data
    return res.status(200).json({
      success: true,
      role: userRoleName,
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




////////////get notification /////////////////////
// Notification controller to get notifications for a specific user
exports.getNotifications = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Fetch unread notifications for the given user
    const notifications = await Notification.findAll({
      where: { user_id },
      order: [['created_at', 'DESC']], // Order by created_at, newest first
    });

    // If no notifications found, return a message
    if (!notifications || notifications.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No notifications found for this user.',
      });
    }

    // Respond with the notifications
    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications.',
      error: error.message,
    });
  }
};


/////////////as readed? ////////////////
// Notification controller to mark notifications as read
exports.markNotificationsAsRead = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Update all unread notifications for the user to be read
    const updatedNotifications = await Notification.update(
      { is_read: true },
      { where: { user_id, is_read: false } }
    );

    // If no notifications were updated
    if (updatedNotifications[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'No unread notifications found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Notifications marked as read.',
    });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to mark notifications as read.',
      error: error.message,
    });
  }
};

