"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../../controllers/overall_sales_calculation_controller/getOverallSalesCalculation'),
  getOverallSalesCalculation = _require.getOverallSalesCalculation,
  getMostSellingProductPercentage = _require.getMostSellingProductPercentage,
  salesOverTime = _require.salesOverTime,
  getStockTargetDetails = _require.getStockTargetDetails;
var _require2 = require('../../middlewares/authMiddleware'),
  authMiddleware = _require2.authMiddleware;

// Route to get notifications
router.get('/rolebased_sales', authMiddleware, getOverallSalesCalculation);
router.get('/mostl_selled_product', authMiddleware, getMostSellingProductPercentage);
router.post('/sales_over_time', authMiddleware, salesOverTime);
router.get('/stock_over_detail', authMiddleware, getStockTargetDetails);
module.exports = router;