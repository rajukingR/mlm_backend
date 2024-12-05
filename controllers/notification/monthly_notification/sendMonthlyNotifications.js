const { SalesTarget, Order, Product, OrderItem, User, Notification } = require('../../../models');
const { Op } = require('sequelize');

exports.sendMonthlyNotifications = async () => {
  try {
    const users = await User.findAll();

    for (const user of users) {
      const { id: user_id, role_name } = user;

      // Reuse the sales target calculation logic
      const salesTargets = await SalesTarget.findAll();
      let totalMonthlyTarget = 0;

      salesTargets.forEach((target) => {
        let productData;
        if (typeof target.product_data === 'string') {
          productData = JSON.parse(target.product_data);
        } else {
          productData = target.product_data;
        }

        productData.forEach((data) => {
          if (data.role === role_name) {
            const targetValue = parseFloat(data.target) || 0;
            const duration = data.duration ? data.duration.toLowerCase() : '';

            if (duration.includes('month')) {
              const months = parseInt(duration) || 1;
              totalMonthlyTarget += targetValue / months;
            }
          }
        });
      });

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

      let totalAchievementAmount = 0;

      for (const order of acceptedOrders) {
        for (const orderItem of order.OrderItems) {
          const product = orderItem.product;

          let price = 0;
          switch (role_name) {
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
          totalAchievementAmount += orderTotal;
        }
      }

      const pendingAmount = totalMonthlyTarget - totalAchievementAmount;
      let achievementAmountPercent = totalMonthlyTarget > 0
        ? (totalAchievementAmount / totalMonthlyTarget) * 100
        : 0;

      if (achievementAmountPercent < 100) {
        const message = `Hello ${role_name}, you have achieved ${achievementAmountPercent.toFixed(
          2
        )}% of your target this month. Please aim to achieve the remaining ${(
          100 - achievementAmountPercent
        ).toFixed(2)}%.`;

        await Notification.create({
          user_id,
          message,
          is_read: false,
          created_at: new Date(),
          detail: {
            totalMonthlyTarget,
            achievementAmountPercent,
            type:"achivement"
          },
        });

        console.log(`Notification sent to user ID: ${user_id}`);
      }
    }

    console.log('Monthly notifications sent successfully');
  } catch (error) {
    console.error('Error sending monthly notifications:', error);
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
  // exports.markNotificationsAsRead = async (req, res) => {
  //   const { user_id } = req.params;
  
  //   try {
  //     // Update all unread notifications for the user to be read
  //     const updatedNotifications = await Notification.update(
  //       { is_read: true },
  //       { where: { user_id, is_read: false } }
  //     );
  
  //     // If no notifications were updated
  //     if (updatedNotifications[0] === 0) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'No unread notifications found.',
  //       });
  //     }
  
  //     return res.status(200).json({
  //       success: true,
  //       message: 'Notifications marked as read.',
  //     });
  //   } catch (error) {
  //     console.error('Error marking notifications as read:', error);
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Failed to mark notifications as read.',
  //       error: error.message,
  //     });
  //   }
  // };

  exports.markNotificationAsRead = async (req, res) => {
    const { user_id, notification_id } = req.params; // Extract user_id and notification_id from params
    
    try {
      // Find the notification by user_id and notification_id
      const notification = await Notification.findOne({
        where: { user_id, id: notification_id, is_read: false }
      });
  
      // If notification not found
      if (!notification) {
        return res.status(404).json({
          success: false,
          message: 'Notification not found or already marked as read.',
        });
      }
  
      // Mark the specific notification as read
      await Notification.update(
        { is_read: true },
        { where: { id: notification_id } }
      );
  
      return res.status(200).json({
        success: true,
        message: 'Notification marked as read.',
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to mark notification as read.',
        error: error.message,
      });
    }
  };
  
  
  
