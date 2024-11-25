const express = require('express');
const router = express.Router();
const { getNotifications, markNotificationAsRead } = require('../../controllers/notification_new_order/notificationNewOrders');

//******//
router.get('/:user_id', getNotifications);
router.patch('/:id', markNotificationAsRead);

module.exports = router;
