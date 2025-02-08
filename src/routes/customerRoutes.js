const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();
const { authMiddleware,isAdmin,setClientRole } = require('../middlewares/authMiddleware'); 


router.post('/create',authMiddleware, setClientRole, customerController.createCustomer );

router.get('/:id', customerController.getCustomerById);

router.put('/:id', customerController.updateCustomerById);

router.delete('/:id', customerController.deleteCustomerById);

router.get('/',authMiddleware, setClientRole, customerController.getAllCustomersByRole);

module.exports = router;
