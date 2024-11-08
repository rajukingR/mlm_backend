// In routes file
const express = require('express');
const router = express.Router();
const userSalesDetail = require('../controllers/user_sales_detail/userSalesDetail');

router.get('/sales_achievement/:role/:user_id', userSalesDetail.getSalesTargetAndAchievement);

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const userSalesDetail = require('../controllers/user_sales_detail/userSalesDetail');


// router.get('/role/:role', userSalesDetail.getSalesTargetByRole);
// router.get('/achivement/:user_id', userSalesDetail.calculateAchievement);

// module.exports = router;