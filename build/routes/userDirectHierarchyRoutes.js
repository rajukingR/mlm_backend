"use strict";

var express = require('express');
var router = express.Router();
var userHierarchyController = require('../controllers/direct_hierarchy_user_controller/DirectHierarchyUserController');
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware,
  isAdmin = _require.isAdmin;

// router.get('/sds-by-ado', userHierarchyController.getSDsByADO);
// router.get('/ds-by-ado', userHierarchyController.getDistributorsByADO);
// router.get('/cs-by-ado', userHierarchyController.getCoustomersByADO);
router.get('/users-by-ado', userHierarchyController.getUsersByADOAndRole);
router.get('/users-by-md', userHierarchyController.getUsersByMDAndRole);
router.get('/users-by-sd', userHierarchyController.getUsersBySDAndRole);
router.get('/user-profile', authMiddleware, userHierarchyController.getUserProfile);
router.get('/profile-hirarchy', authMiddleware, userHierarchyController.getUserProfileByHierarchy);
router.get('/profileby-admin/:userId', authMiddleware, userHierarchyController.getUserProfileByAdmin);
module.exports = router;