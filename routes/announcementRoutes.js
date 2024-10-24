
const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcements_controller/announcementsController');

router.get('/', announcementController.getAnnouncements);
router.get('/:id', announcementController.getByIdAnnouncement);
router.post('/create',announcementController.createAnnouncement);
router.put('/:id',announcementController.updateByIdAnnouncement);
router.delete('/:id', announcementController.deleteByIdAnnouncement);

module.exports = router;
