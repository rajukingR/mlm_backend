const { NotificationOrder } = require('../../models');

// Get notifications for a specific user
exports.getNotifications = async (req, res) => {
  const { user_id } = req.params;

  try {
    const notifications = await NotificationOrder.findAll({
      where: { receive_user_id: user_id },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await NotificationOrder.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.is_read = true; // Mark as read
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
