"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require('../../../models'),
  User = _require.User;
var crypto = require('crypto');
var secretKey = 'mttmtt4699';
var encryptPassword = function encryptPassword(password) {
  var cipher = crypto.createCipher('aes-256-cbc', secretKey);
  var encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher["final"]('hex');
  return encrypted;
};
var decryptPassword = function decryptPassword(encryptedPassword) {
  var decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  var decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
  decrypted += decipher["final"]('utf8');
  return decrypted;
};

//******** Dynamic function to get users by ADO and role  ***********//
exports.getUsersByADOAndRole = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$query, adoId, roleId, whereCondition, users;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, adoId = _req$query.adoId, roleId = _req$query.roleId;
          if (!(!adoId || !roleId)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'ADO ID and role ID are required'
          }));
        case 4:
          whereCondition = {
            superior_id: adoId,
            role_id: roleId
          };
          _context.next = 7;
          return User.findAll({
            where: whereCondition
          });
        case 7:
          users = _context.sent;
          if (!(users.length === 0)) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: "No users found for ADO with role ID ".concat(roleId)
          }));
        case 10:
          res.status(200).json(users);
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//********  Function to get users by MD and role ***********//
exports.getUsersByMDAndRole = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$query2, mdId, roleId, whereCondition, users;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query2 = req.query, mdId = _req$query2.mdId, roleId = _req$query2.roleId;
          if (!(!mdId || !roleId)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: 'MD ID and role ID are required'
          }));
        case 4:
          whereCondition = {
            superior_id: mdId,
            role_id: roleId
          };
          _context2.next = 7;
          return User.findAll({
            where: whereCondition
          });
        case 7:
          users = _context2.sent;
          if (!(users.length === 0)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "No users found for MD with role ID ".concat(roleId)
          }));
        case 10:
          res.status(200).json(users);
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: _context2.t0.message
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Function to get users by SD and role
exports.getUsersBySDAndRole = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$query3, sdId, roleId, whereCondition, users;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query3 = req.query, sdId = _req$query3.sdId, roleId = _req$query3.roleId;
          if (!(!sdId || !roleId)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: 'SD ID and role ID are required'
          }));
        case 4:
          whereCondition = {
            superior_id: sdId,
            role_id: roleId
          };
          _context3.next = 7;
          return User.findAll({
            where: whereCondition
          });
        case 7:
          users = _context3.sent;
          if (!(users.length === 0)) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "No users found for SD with role ID ".concat(roleId)
          }));
        case 10:
          res.status(200).json(users);
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: _context3.t0.message
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Fetch profile dynamically based on logged-in user
exports.getUserProfile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var userId, user, decryptedPassword, userProfile;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          _context4.next = 4;
          return User.findByPk(userId);
        case 4:
          user = _context4.sent;
          if (user) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));
        case 7:
          // Decrypt the password
          decryptedPassword = decryptPassword(user.password); // Construct the response object with decrypted password
          userProfile = _objectSpread(_objectSpread({}, user.toJSON()), {}, {
            // Spread the user data
            password: decryptedPassword
          }); // res.status(200).json(user);
          res.status(200).json(userProfile);
          _context4.next = 15;
          break;
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: _context4.t0.message
          });
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Fetch profile dynamically based on logged-in user and optional target user ID
exports.getUserProfileByHierarchy = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var loggedInUserId, targetUserId, loggedInUser, targetUser, decryptedPassword, targetUserProfile;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          loggedInUserId = req.user.id;
          targetUserId = req.query.userId || loggedInUserId;
          _context5.next = 5;
          return User.findByPk(loggedInUserId);
        case 5:
          loggedInUser = _context5.sent;
          if (loggedInUser) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: 'Logged-in user not found'
          }));
        case 8:
          _context5.next = 10;
          return User.findByPk(targetUserId);
        case 10:
          targetUser = _context5.sent;
          if (targetUser) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: 'Target user not found'
          }));
        case 13:
          decryptedPassword = decryptPassword(targetUser.password);
          targetUserProfile = _objectSpread(_objectSpread({}, targetUser.toJSON()), {}, {
            // Spread the user data
            password: decryptedPassword // Replace the password with the decrypted password
          });
          if (!(targetUser.superior_id !== loggedInUserId && loggedInUser.role_id !== 1)) {
            _context5.next = 17;
            break;
          }
          return _context5.abrupt("return", res.status(403).json({
            error: 'You are not authorized to view this user profile.'
          }));
        case 17:
          // res.status(200).json(targetUser);
          res.status(200).json(targetUserProfile);
          _context5.next = 23;
          break;
        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: _context5.t0.message
          });
        case 23:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 20]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Fetch any user's profile by Admin or other roles using ID
exports.getUserProfileByAdmin = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var userId, allowedRoles, user, decryptedPassword, targetUserProfile;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.params.userId; // Allow access for roles 1 (Admin), 2, 3, 4, and 5
          allowedRoles = [1, 2, 3, 4, 5];
          if (allowedRoles.includes(req.user.role_id)) {
            _context6.next = 5;
            break;
          }
          return _context6.abrupt("return", res.status(403).json({
            error: 'Access denied. You do not have the required permissions.'
          }));
        case 5:
          _context6.next = 7;
          return User.findByPk(userId);
        case 7:
          user = _context6.sent;
          if (user) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));
        case 10:
          // Decrypt the user's password
          decryptedPassword = decryptPassword(user.password); // Prepare the user's profile data
          targetUserProfile = _objectSpread(_objectSpread({}, user.toJSON()), {}, {
            password: decryptedPassword // Include the decrypted password
          }); // Send the response

          res.status(200).json(targetUserProfile);
          _context6.next = 18;
          break;
        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: _context6.t0.message
          });
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 15]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// const { User } = require('../../models');

// // Dynamic function to get users by ADO and role
// exports.getUsersByADOAndRole = async (req, res) => {
//   try {
//     const { adoId, roleId } = req.query;
//     //**  Validate ADO ID and role ID **//
//     if (!adoId || !roleId) {
//       return res.status(400).json({ error: 'ADO ID and role ID are required' });
//     }

//     //** Initialize where condition **//
//     const whereCondition = {
//       superior_ado: adoId,    // Check the ADO assigned
//       superior_md: null,      // Ensure superior_md is null
//       role_id: roleId         // Role ID is dynamic
//     };

//     //**  Dynamically add conditions for superior_sd and superior_d based on role ID **//
//     if (roleId == 4) { 
//       whereCondition.superior_sd = null; // Ensure superior_sd is null for SDs
//     } else if (roleId == 5) { 
//       whereCondition.superior_sd = null; // Ensure superior_sd is null for Ds
//       whereCondition.superior_d = null;  // Ensure superior_d is null for Ds
//     } else if (roleId == 6) { 
//       whereCondition.superior_sd = null; // Ensure superior_sd is null for Cs
//       whereCondition.superior_d = null;  // Ensure superior_d is null for Cs
//     }

//     //**  Fetch users based on ADO and role dynamically **//
//     const users = await User.findAll({
//       where: whereCondition
//     });

//     //**  Check if any users were found **//
//     if (users.length === 0) {
//       return res.status(404).json({ message: `No users found for ADO with role ID ${roleId}` });
//     }

//     //** Respond with the list of users **//
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //************ Dynamic function to get users by MD and role ***************//
// exports.getUsersByMDAndRole = async (req, res) => {
//   try {
//     const { mdId, roleId } = req.query;

//     //** Validate MD ID and role ID **//
//     if (!mdId || !roleId) {
//       return res.status(400).json({ error: 'MD ID and role ID are required' });
//     }

//     // Initialize where condition
//     const whereCondition = {
//       superior_md: mdId,    
//       role_id: roleId     
//     };

//     // Dynamically add conditions for superior_sd and superior_d based on role ID
//     if (roleId == 4) { 
//       whereCondition.superior_sd = null; // Ensure the SD is directly under the MD
//     } else if (roleId == 5) { 
//       whereCondition.superior_sd = null; // Ensure Distributor is directly under the MD
//       whereCondition.superior_d = null;  // Ensure Distributor is not under any other D
//     } else if (roleId == 6) {
//       whereCondition.superior_sd = null; // Ensure Customer is directly under the MD
//       whereCondition.superior_d = null;  // Ensure Customer is not under any other D
//     }

//     // Fetch users based on MD and role dynamically
//     const users = await User.findAll({
//       where: whereCondition
//     });

//     // Check if any users were found
//     if (users.length === 0) {
//       return res.status(404).json({ message: `No users found for MD with role ID ${roleId}` });
//     }

//     // Respond with the list of users
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //************* Dynamic function to get users by SD and role *************//
// exports.getUsersBySDAndRole = async (req, res) => {
//   try {
//     const { sdId, roleId } = req.query;

//     //**  Validate SD ID and role ID **//
//     if (!sdId || !roleId) {
//       return res.status(400).json({ error: 'SD ID and role ID are required' });
//     }

//     //**  Initialize where condition **//
//     const whereCondition = {
//       superior_sd: sdId,    
//       role_id: roleId     
//     };

//     // Dynamically add conditions for superior_d based on role ID
//     if (roleId == 5) {
//       whereCondition.superior_d = null;  // Ensure Distributor is directly under the SD
//     } else if (roleId == 6) { 
//       whereCondition.superior_d = null;  // Ensure Customer is directly under the SD, no D in-between
//     }

//     // Fetch users based on SD and role dynamically
//     const users = await User.findAll({
//       where: whereCondition
//     });

//     // Check if any users were found
//     if (users.length === 0) {
//       return res.status(404).json({ message: `No users found for SD with role ID ${roleId}` });
//     }

//     // Respond with the list of users
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //********** Fetch profile dynamically based on logged-in user *******//
// exports.getUserProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming req.user contains the logged-in user's details (from auth middleware)

//     // Fetch the user's profile based on their ID
//     const user = await User.findByPk(userId);

//     // Check if the user exists
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Fetch the profile based on user role dynamically
//     const userRole = user.role_id;

//     let profile;

//     // Define different profile data based on user roles
//     if (userRole === 2) { // ADO
//       profile = await User.findOne({
//         where: { id: userId },
//         // attributes: ['username', 'email', 'full_name', 'mobile_number', 'state', 'city', 'street_name', 'pincode', 'role_id']
//       });
//     } else if (userRole === 3) { // MD (Master Distributor)
//       profile = await User.findOne({
//         where: { id: userId },
//         // attributes: ['username', 'email', 'full_name', 'mobile_number', 'state', 'city', 'superior_ado', 'role_id']
//       });
//     } else if (userRole === 4) { // SD (Super Distributor)
//       profile = await User.findOne({
//         where: { id: userId },
//         // attributes: ['username', 'email', 'full_name', 'mobile_number', 'state', 'city', 'superior_md', 'role_id']
//       });
//     } else if (userRole === 5) { // D (Distributor)
//       profile = await User.findOne({
//         where: { id: userId },
//         // attributes: ['username', 'email', 'full_name', 'mobile_number', 'state', 'city', 'superior_sd', 'role_id']
//       });
//     } else if (userRole === 6) { // C (Customer)
//       profile = await User.findOne({
//         where: { id: userId },
//         // attributes: ['username', 'email', 'full_name', 'mobile_number', 'state', 'city', 'superior_d', 'role_id']
//       });
//     } else {
//       return res.status(400).json({ error: 'Invalid role or role not recognized' });
//     }

//     // Send back the user's profile
//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Fetch profile dynamically based on logged-in user and optional target user ID
// exports.getUserProfileByHierarchy = async (req, res) => {
//   try {
//     const loggedInUserId = req.user.id; // Assuming req.user contains the logged-in user's details (from auth middleware)
//     const targetUserId = req.query.userId || loggedInUserId; // Use the logged-in user ID if no other user ID is passed

//     // Fetch the logged-in user's profile to check their role
//     const loggedInUser = await User.findByPk(loggedInUserId);

//     // Check if the logged-in user exists
//     if (!loggedInUser) {
//       return res.status(404).json({ error: 'Logged-in user not found' });
//     }

//     // If a target user is specified, fetch their profile
//     const targetUser = await User.findByPk(targetUserId);

//     // Check if the target user exists
//     if (!targetUser) {
//       return res.status(404).json({ error: 'Target user not found' });
//     }

//     // Ensure that the logged-in user is allowed to view the target user's profile based on the hierarchy
//     const loggedInUserRole = loggedInUser.role_id;
//     const targetUserRole = targetUser.role_id;

//     // Fetch the profile of the logged-in user or the target user
//     let profile;

//     // ADO (Role ID 2) can view MDs, SDs, Ds, Cs in their hierarchy
//     if (loggedInUserRole === 2) {
//       // ADO should only be able to view users under their hierarchy (e.g., MD, SD, D, C)
//       if (
//         (targetUserRole === 3 && targetUser.superior_ado === loggedInUserId) || // MD
//         (targetUserRole === 4 && targetUser.superior_ado === loggedInUserId) || // SD
//         (targetUserRole === 5 && targetUser.superior_ado === loggedInUserId) || // D
//         (targetUserRole === 6 && targetUser.superior_ado === loggedInUserId)    // C
//       ) {
//         profile = await fetchUserProfile(targetUserId);
//       } else {
//         return res.status(403).json({ error: 'You are not authorized to view this user profile.' });
//       }
//     }
//     // MD (Role ID 3) can view SDs, Ds, Cs in their hierarchy
//     else if (loggedInUserRole === 3) {
//       if (
//         (targetUserRole === 4 && targetUser.superior_md === loggedInUserId) || // SD
//         (targetUserRole === 5 && targetUser.superior_md === loggedInUserId) || // D
//         (targetUserRole === 6 && targetUser.superior_md === loggedInUserId)    // C
//       ) {
//         profile = await fetchUserProfile(targetUserId);
//       } else {
//         return res.status(403).json({ error: 'You are not authorized to view this user profile.' });
//       }
//     }
//     // SD (Role ID 4) can view Ds and Cs in their hierarchy
//     else if (loggedInUserRole === 4) {
//       if (
//         (targetUserRole === 5 && targetUser.superior_sd === loggedInUserId) || // D
//         (targetUserRole === 6 && targetUser.superior_sd === loggedInUserId)    // C
//       ) {
//         profile = await fetchUserProfile(targetUserId);
//       } else {
//         return res.status(403).json({ error: 'You are not authorized to view this user profile.' });
//       }
//     }
//     // D (Role ID 5) can only view Cs in their hierarchy
//     else if (loggedInUserRole === 5) {
//       if (targetUserRole === 6 && targetUser.superior_d === loggedInUserId) {
//         profile = await fetchUserProfile(targetUserId);
//       } else {
//         return res.status(403).json({ error: 'You are not authorized to view this user profile.' });
//       }
//     }
//     // C (Role ID 6) can only view their own profile
//     else if (loggedInUserRole === 6) {
//       if (targetUserId !== loggedInUserId) {
//         return res.status(403).json({ error: 'You are only authorized to view your own profile.' });
//       }
//       profile = await fetchUserProfile(targetUserId);
//     }
//     else {
//       return res.status(400).json({ error: 'Invalid role or role not recognized' });
//     }

//     // Return the profile data
//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Helper function to fetch user profile
// async function fetchUserProfile(userId) {
//   return await User.findOne({
//     where: { id: userId },
//     // attributes: ['username', 'email', 'full_name', 'mobile_number', 'state', 'city', 'street_name', 'pincode', 'role_id', 'superior_ado', 'superior_md', 'superior_sd', 'superior_d']
//   });
// }

// //********** Fetch any user's profile by Admin using ID *******//
// exports.getUserProfileByAdmin = async (req, res) => {
//   try {
//     const { userId } = req.params; // Get the user ID from route parameters

//     // Check if the admin is authorized (assuming req.user contains the logged-in admin's details from the auth middleware)
//     if (req.user.role_id !== 1) { // Assuming role_id 1 corresponds to Admin
//       return res.status(403).json({ error: 'Access denied. Only admin can view this information.' });
//     }

//     // Fetch the user's profile based on the provided user ID
//     const user = await User.findByPk(userId);

//     // Check if the user exists
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Respond with the user's profile
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };