const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club_controller/clubController');

// Club Routes
router.post('/create', clubController.createClub);
router.get('/', clubController.getClubs);
router.get('/:id', clubController.getByIdClubs);
router.put('/:id', clubController.updateByIdClubs);
router.delete('/:id', clubController.deleteByIdClubs);

module.exports = router;
