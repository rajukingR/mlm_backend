"use strict";

// In routes file
var express = require('express');
var router = express.Router();
var userSalesDetail = require('../controllers/user_sales_detail/userSalesDetail');
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware;
router.get('/sales_achievement/:role/:user_id', userSalesDetail.getMonthlySalesDetails);
router.get('/getLowHierarchySalesDetails/:user_id', userSalesDetail.getLowHierarchySalesDetails);
router.get('/getLowHierarchySalesDetailsId/:user_id', userSalesDetail.getUserCurrentMonthSalesDetailsId);
module.exports = router;