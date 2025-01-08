"use strict";

// routes/announcementRoutes.js

var express = require('express');
var router = express.Router();
var announcementController = require('../controllers/announcements_controller/announcementsController');
var upload = require('../middlewares/multer'); // Make sure multer is set up correctly
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware;
router.get('/', authMiddleware, announcementController.getAnnouncements);
router.get('/:id', announcementController.getByIdAnnouncement);
router.post('/create', upload.single('image'), announcementController.createAnnouncement);
router.put('/:id', upload.single('image'), announcementController.updateByIdAnnouncement);
router["delete"]('/:id', announcementController.deleteByIdAnnouncement);
module.exports = router;