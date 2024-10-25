// routes/announcementRoutes.js

const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcements_controller/announcementsController');
const upload = require('../middlewares/multer'); // Make sure multer is set up correctly

router.get('/', announcementController.getAnnouncements);
router.get('/:id', announcementController.getByIdAnnouncement);
router.post('/create', upload.single('image'), announcementController.createAnnouncement);
router.put('/:id', upload.single('image'), announcementController.updateByIdAnnouncement);
router.delete('/:id', announcementController.deleteByIdAnnouncement);

module.exports = router;
