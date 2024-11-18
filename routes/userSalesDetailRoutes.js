// In routes file
const express = require('express');
const router = express.Router();
const userSalesDetail = require('../controllers/user_sales_detail/userSalesDetail');

router.get('/sales_achievement/:role/:user_id', userSalesDetail.getMonthlySalesDetails);

module.exports = router;