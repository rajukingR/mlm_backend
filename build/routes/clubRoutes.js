"use strict";

var express = require('express');
var router = express.Router();
var clubController = require('../controllers/club_controller/clubController');
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware;

// Club Routes
router.post('/create', clubController.createClub);
router.get('/', authMiddleware, clubController.getClubs);
router.get('/:id', clubController.getByIdClubs);
router.put('/:id', clubController.updateByIdClubs);
router["delete"]('/:id', clubController.deleteByIdClubs);
module.exports = router;