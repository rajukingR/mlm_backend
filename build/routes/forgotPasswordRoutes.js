"use strict";

var express = require('express');
var _require = require('../controllers/forgotPasswordController'),
  sendForgotPasswordLink = _require.sendForgotPasswordLink,
  resetPassword = _require.resetPassword;
var router = express.Router();

// Define the POST route to handle forgot password requests
router.post('/', sendForgotPasswordLink);
router.post('/reset', resetPassword);
module.exports = router;