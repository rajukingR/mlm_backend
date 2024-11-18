const express = require('express');
const sendMonthlyNotifications  = require('../../controllers/monthly_notification/sendMonthlyNotifications');
const router = express.Router();

//** Route to trigger notifications manually --> Only for development **//
router.get('/send-notifications', async (req, res) => {
  try {
    await sendMonthlyNotifications();
    res.status(200).send({ message: 'Notifications sent successfully!' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send({ error: 'Failed to send notifications' });
  }
});
// **Notification Get&Update api**//
router.get('/notifications/:user_id', sendMonthlyNotifications.getNotifications);
router.put('/notifications/read/:user_id', sendMonthlyNotifications.markNotificationsAsRead);

module.exports = router;
