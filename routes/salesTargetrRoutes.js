const express = require("express");
const router = express.Router();
const salesTargetController = require('../controllers/salestarget_controller/salesTargetController');

// Sales Target Routes
router.post("/create", salesTargetController.createSalesTarget); // Create a new sales target
router.get("/", salesTargetController.getSalesTargets);          // Get all sales targets
router.get("/:id", salesTargetController.getSalesTargetById);    // Get sales target by ID
router.put("/:id", salesTargetController.updateSalesTarget);      // Update sales target by ID
router.delete("/:id", salesTargetController.deleteSalesTarget);    // Delete sales target by ID

module.exports = router;
