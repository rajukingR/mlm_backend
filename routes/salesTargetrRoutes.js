const express = require("express");
const router = express.Router();
const salesTargetController = require('../controllers/salestarget_controller/salesTargetController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Sales Target Routes
router.post("/create", salesTargetController.createSalesTarget); 
router.get("/",authMiddleware, salesTargetController.getSalesTargets);          
router.get("/:product_name", salesTargetController.getSalesTargetByProductName);
router.put('/:product_name', salesTargetController.updateSalesTarget);
router.delete("/:productName", salesTargetController.deleteSalesTarget);

module.exports = router;
