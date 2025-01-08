"use strict";

// minimumStockRouter.js
var express = require("express");
var router = express.Router();
var minimumstockController = require('../controllers/minimumstock_controller/minimumStockController');

// Minimum Stock Routes
router.post("/create", minimumstockController.createMinimumStock);
router.get("/", minimumstockController.getMinimumStocks);
router.get("/:id", minimumstockController.getMinimumStockById);
router.put("/:id", minimumstockController.updateMinimumStock);
router["delete"]("/:id", minimumstockController.deleteMinimumStock);
module.exports = router;