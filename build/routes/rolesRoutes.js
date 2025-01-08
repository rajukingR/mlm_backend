"use strict";

var express = require('express');
var rolesController = require('../controllers/roles_controllers/rolesController');
var _require = require('../middlewares/authMiddleware'),
  isAdmin = _require.isAdmin,
  authMiddleware = _require.authMiddleware;
var router = express.Router();

// Define routes for CRUD operations
router.get('/role-list', authMiddleware, rolesController.getRoles);
router.post('/create', authMiddleware, isAdmin, rolesController.createRole);
module.exports = router;