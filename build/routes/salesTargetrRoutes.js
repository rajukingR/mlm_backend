"use strict";

var express = require("express");
var router = express.Router();
var salesTargetController = require('../controllers/salestarget_controller/salesTargetController');
var _require = require('../middlewares/authMiddleware'),
  authMiddleware = _require.authMiddleware;

// Sales Target Routes
// router.post("/create", salesTargetController.createSalesTarget); 
router.get("/", authMiddleware, salesTargetController.getSalesStockTargets);
router.put('/:role_name', salesTargetController.updateSalesStockTarget);
module.exports = router;