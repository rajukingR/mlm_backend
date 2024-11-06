const express = require('express');
const router = express.Router();
const userSalesDetail = require('../controllers/user_sales_detail/userSalesDetail');



router.get('/role/:role', userSalesDetail.getSalesTargetByRole);
router.get('/achivement/:user_id', userSalesDetail.calculateAchievement);







module.exports = router;