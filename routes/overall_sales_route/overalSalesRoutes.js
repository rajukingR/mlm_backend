const express = require('express');
const router = express.Router();
const { getOverallSalesCalculation } = require('../../controllers/overall_sales_calculation_controller/getOverallSalesCalculation');


// Route to get notifications
router.get('/rolebased_sales', getOverallSalesCalculation);


module.exports = router;
