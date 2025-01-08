const express = require('express');
const { sendMonthlyNotifications, getNotifications, markNotificationAsRead } = require('../../controllers/notification/monthly_notification/sendMonthlyNotifications');
const router = express.Router();

// Route to trigger notifications manually
router.get('/send-notifications', async (req, res) => {
  try {
    await sendMonthlyNotifications();
    res.status(200).send({ message: 'Notifications sent successfully!' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send({ error: 'Failed to send notifications' });
  }
});

// Route to get notifications
router.get('/notifications/:user_id', getNotifications);

// Route to mark notifications as read
router.put('/notifications/read/:user_id/:notification_id', markNotificationAsRead);

module.exports = router;
