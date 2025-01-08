"use strict";

var express = require('express');
var router = express.Router();
var userHierarchyController = require('../controllers/hierarchy_user_controllers/userHierarchyController');

// User hirarchy (member) routes //
router.get('/mds', userHierarchyController.getMasterDistributorsByADO);
router.get('/sds', userHierarchyController.getSuperDistributorsByMD);
router.get('/ds', userHierarchyController.getDistributorsBySD);
router.get('/cs', userHierarchyController.getCustomersByDistributor);
module.exports = router;