"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/member-controller/memberController"),
  updateMember = _require.updateMember,
  rejectMember = _require.rejectMember;

// Member update route
router.put('/member-update/update/:id', updateMember);
module.exports = router;