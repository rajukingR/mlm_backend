"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require('../../models'),
  User = _require.User,
  Role = _require.Role;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var _require2 = require('sequelize'),
  Op = _require2.Op;
//
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

/////**** Signin For Web ******/
exports.signInWeb = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, mobile_number, password, user, decryptedPassword, token;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, mobile_number = _req$body.mobile_number, password = _req$body.password; // Validate required fields
          if (!(!mobile_number || !password)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'Mobile_number and password are required'
          }));
        case 4:
          _context.next = 6;
          return User.findOne({
            where: {
              mobile_number: mobile_number
            }
          });
        case 6:
          user = _context.sent;
          if (user) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            error: 'Invalid mobile or password'
          }));
        case 9:
          // Compare the provided password with the stored hashed password
          // const isPasswordValid = await bcrypt.compare(password, user.password);
          decryptedPassword = decryptPassword(user.password); // If password is incorrect, return an error
          // if (!isPasswordValid) {
          //   return res.status(401).json({ error: 'Invalid mobile or password' });
          // }
          if (!(password !== decryptedPassword)) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            error: 'Invalid mobile or password'
          }));
        case 12:
          // Generate a JWT token
          token = jwt.sign({
            id: user.id,
            mobile_number: user.mobile_number,
            role: user.role_name // Use role_name instead of role_id
          }, process.env.JWT_SECRET,
          // Ensure this is set in your .env file
          {
            expiresIn: '24h'
          } // Token expiry time
          ); // Return the token and user details (excluding the password)

          res.status(200).json({
            token: token,
            user: {
              id: user.id,
              mobile_number: user.mobile_number,
              role: user.role_name // Use role_name instead of role_id
            }
          });
          _context.next = 19;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/////////*************** User sign-in ******************/////////
exports.signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, mobile_number, password, user, decryptedPassword, token;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, mobile_number = _req$body2.mobile_number, password = _req$body2.password; // Validate required fields
          if (!(!mobile_number || !password)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: 'Mobile_number and password are required'
          }));
        case 4:
          _context2.next = 6;
          return User.findOne({
            where: {
              mobile_number: mobile_number
            }
          });
        case 6:
          user = _context2.sent;
          if (user) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            error: 'Invalid mobile or password'
          }));
        case 9:
          // Compare the provided password with the stored hashed password
          // const isPasswordValid = await bcrypt.compare(password, user.password);
          decryptedPassword = decryptPassword(user.password); // If password is incorrect, return an error
          // if (!isPasswordValid) {
          //   return res.status(401).json({ error: 'Invalid mobile or password' });
          // }
          if (!(password !== decryptedPassword)) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            error: 'Invalid mobile or password'
          }));
        case 12:
          // Generate a JWT token
          token = jwt.sign({
            id: user.id,
            mobile_number: user.mobile_number,
            role: user.role_name // Use role_name instead of role_id
          }, process.env.JWT_SECRET,
          // Ensure this is set in your .env file
          {
            expiresIn: '180d'
          } // Token expiry time
          ); // Return the token and user details (excluding the password)

          res.status(200).json({
            token: token,
            user: {
              id: user.id,
              mobile_number: user.mobile_number,
              role: user.role_name // Use role_name instead of role_id
            }
          });
          _context2.next = 19;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: _context2.t0.message
          });
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

///// ************************User sign-up***********************************/////
// exports.signUp = async (req, res) => {
//   try {
//     const {
//       username,
//       password,
//       email,
//       role_id,
//       superior_id,
//       pincode,
//       state,
//       city,
//       street_name,
//       building_no_name,
//       mobile_number,
//       full_name,
//       gst_number
//     } = req.body;

//     // Validate role
//     const role = await Role.findByPk(role_id);
//     if (!role) {
//       return res.status(400).json({ error: 'Invalid role ID' });
//     }

//     // Validate superior user (creator)
//     const roleHierarchy = {
//       1: ['2', '3', '4', '5', '6'],
//       2: ['3', '4', '5', '6'],
//       3: ['4', '5', '6'],
//       4: ['5', '6'],
//       5: ['6'],
//       6: []
//     };

//     const creator = await User.findByPk(superior_id);
//     if (!creator) {
//       return res.status(400).json({ error: 'Invalid superior_id' });
//     }

//     // Ensure Admin cannot be assigned as a superior for hierarchical users
//     if (creator.role_name === 'Admin') {
//       return res.status(400).json({ error: 'Admin cannot be assigned as superior' });
//     }

//     const allowedRoles = roleHierarchy[creator.role_id];
//     if (!allowedRoles.includes(role_id.toString())) {
//       return res.status(400).json({ error: 'Superior user role cannot supervise this role' });
//     }

//     // Check for existing username, email, and mobile number
//     const [existingUser, existingEmail, existingMobile] = await Promise.all([
//       User.findOne({ where: { username } }),
//       User.findOne({ where: { email } }),
//       User.findOne({ where: { mobile_number } })
//     ]);

//     if (existingUser || existingEmail || existingMobile) {
//       const errorMessages = [];
//       if (existingUser) errorMessages.push('Username already exists');
//       if (existingEmail) errorMessages.push('Email already exists');
//       if (existingMobile) errorMessages.push('Mobile number already exists');
//       return res.status(400).json({ error: errorMessages.join(', ') });
//     }

//     // Create the user after validation passes
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       username,
//       password: hashedPassword,
//       email,
//       role_id,
//       superior_id,
//       role_name: role.role_name,
//       pincode,
//       state,
//       city,
//       street_name,
//       building_no_name,
//       mobile_number,
//       full_name,
//       gst_number
//     });

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// };

exports.signUp = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body3, password, email, role_id, superior_id, pincode, state, city, street_name, building_no_name, mobile_number, full_name, gst_number, club_name, country, district, _loggedInUserId, role, username, finalSuperiorId, adminUser, creator, roleHierarchy, allowedRoles, allowedFormats, _yield$Promise$all, _yield$Promise$all2, existingUser, existingEmail, existingMobile, errorMessages, encryptedPassword, newUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body3 = req.body, password = _req$body3.password, email = _req$body3.email, role_id = _req$body3.role_id, superior_id = _req$body3.superior_id, pincode = _req$body3.pincode, state = _req$body3.state, city = _req$body3.city, street_name = _req$body3.street_name, building_no_name = _req$body3.building_no_name, mobile_number = _req$body3.mobile_number, full_name = _req$body3.full_name, gst_number = _req$body3.gst_number, club_name = _req$body3.club_name, country = _req$body3.country, district = _req$body3.district; // Extract user ID from the authentication token (Admin's ID)
          _loggedInUserId = req.user.id; // Assuming `req.user.id` contains the logged-in user's ID from the token
          // Validate role
          _context3.next = 5;
          return Role.findByPk(role_id);
        case 5:
          role = _context3.sent;
          if (role) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: 'Invalid role ID'
          }));
        case 8:
          _context3.t0 = role.role_name;
          _context3.next = _context3.t0 === 'Area Development Officer' ? 11 : _context3.t0 === 'Master Distributor' ? 13 : _context3.t0 === 'Super Distributor' ? 15 : _context3.t0 === 'Distributor' ? 17 : _context3.t0 === 'Customer' ? 19 : 21;
          break;
        case 11:
          username = "ado_".concat(mobile_number);
          return _context3.abrupt("break", 21);
        case 13:
          username = "md_".concat(mobile_number);
          return _context3.abrupt("break", 21);
        case 15:
          username = "sd_".concat(mobile_number);
          return _context3.abrupt("break", 21);
        case 17:
          username = "d_".concat(mobile_number);
          return _context3.abrupt("break", 21);
        case 19:
          username = "c_".concat(mobile_number);
          return _context3.abrupt("break", 21);
        case 21:
          finalSuperiorId = superior_id;
          if (!(role.role_name === 'Area Development Officer')) {
            _context3.next = 34;
            break;
          }
          if (superior_id) {
            _context3.next = 27;
            break;
          }
          finalSuperiorId = _loggedInUserId; // Use the logged-in Admin's ID
          _context3.next = 32;
          break;
        case 27:
          _context3.next = 29;
          return User.findOne({
            where: {
              role_name: 'Admin',
              id: superior_id
            }
          });
        case 29:
          adminUser = _context3.sent;
          if (adminUser) {
            _context3.next = 32;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: 'Admin ID not valid or Admin not found'
          }));
        case 32:
          _context3.next = 45;
          break;
        case 34:
          _context3.next = 36;
          return User.findByPk(superior_id);
        case 36:
          creator = _context3.sent;
          if (creator) {
            _context3.next = 39;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: 'Invalid superior_id'
          }));
        case 39:
          if (!(creator.role_name === 'Admin')) {
            _context3.next = 41;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: 'Admin cannot be assigned as superior'
          }));
        case 41:
          roleHierarchy = {
            1: ['2', '3', '4', '5', '6'],
            2: ['3', '4', '5', '6'],
            3: ['4', '5', '6'],
            4: ['5', '6'],
            5: ['6'],
            6: []
          };
          allowedRoles = roleHierarchy[creator.role_id];
          if (allowedRoles.includes(role_id.toString())) {
            _context3.next = 45;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: 'Superior user role cannot supervise this role'
          }));
        case 45:
          // Image validation
          allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
          if (!(req.file && !allowedFormats.includes(req.file.mimetype))) {
            _context3.next = 48;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid image format. Only JPEG, PNG, and GIF are allowed.'
          }));
        case 48:
          _context3.next = 50;
          return Promise.all([User.findOne({
            where: {
              username: username
            }
          }), User.findOne({
            where: {
              email: email
            }
          }), User.findOne({
            where: {
              mobile_number: mobile_number
            }
          })]);
        case 50:
          _yield$Promise$all = _context3.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
          existingUser = _yield$Promise$all2[0];
          existingEmail = _yield$Promise$all2[1];
          existingMobile = _yield$Promise$all2[2];
          if (!(existingUser || existingEmail || existingMobile)) {
            _context3.next = 61;
            break;
          }
          errorMessages = [];
          if (existingUser) errorMessages.push('Username already exists');
          if (existingEmail) errorMessages.push('Email already exists');
          if (existingMobile) errorMessages.push('Mobile number already exists');
          return _context3.abrupt("return", res.status(400).json({
            error: errorMessages.join(', ')
          }));
        case 61:
          // Create the user after validation passes
          // const hashedPassword = await bcrypt.hash(password, 10);
          encryptedPassword = encryptPassword(password);
          _context3.next = 64;
          return User.create({
            username: username,
            password: encryptedPassword,
            email: email,
            role_id: role_id,
            superior_id: finalSuperiorId,
            // Use the final superior_id which is now handled correctly
            role_name: role.role_name,
            pincode: pincode,
            state: state,
            city: city,
            street_name: street_name,
            building_no_name: building_no_name,
            mobile_number: mobile_number,
            full_name: full_name,
            gst_number: gst_number,
            club_name: club_name,
            image: req.file ? req.file.filename : null,
            country: country,
            district: district
          });
        case 64:
          newUser = _context3.sent;
          res.status(201).json(newUser);
          _context3.next = 72;
          break;
        case 68:
          _context3.prev = 68;
          _context3.t1 = _context3["catch"](0);
          console.error('Error creating user:', _context3.t1);
          res.status(500).json({
            error: 'Failed to create user'
          });
        case 72:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 68]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

////////////***************** Optimized User Update Controller   ***********/////////////
// Optimized User Update Controller
// Optimized User Update Controller
exports.updateUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var userId, _req$body4, password, email, role_id, superior_id, pincode, state, city, street_name, building_no_name, mobile_number, full_name, gst_number, status, club_name, country, district, user, role, username, finalSuperiorId, adminUser, superiorUser, allowedRolesForAdmin, roleHierarchy, allowedRoles, existingUser, encryptedPassword, allowedFormats, imageFilename;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.params.userId;
          _req$body4 = req.body, password = _req$body4.password, email = _req$body4.email, role_id = _req$body4.role_id, superior_id = _req$body4.superior_id, pincode = _req$body4.pincode, state = _req$body4.state, city = _req$body4.city, street_name = _req$body4.street_name, building_no_name = _req$body4.building_no_name, mobile_number = _req$body4.mobile_number, full_name = _req$body4.full_name, gst_number = _req$body4.gst_number, status = _req$body4.status, club_name = _req$body4.club_name, country = _req$body4.country, district = _req$body4.district; // Validate required fields
          if (!(!email || !role_id || !mobile_number)) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Required fields must be provided: email, role_id, and mobile_number.'
          }));
        case 5:
          _context4.next = 7;
          return User.findByPk(userId);
        case 7:
          user = _context4.sent;
          if (user) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: 'User not found.'
          }));
        case 10:
          _context4.next = 12;
          return Role.findByPk(role_id);
        case 12:
          role = _context4.sent;
          if (role) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Invalid role ID.'
          }));
        case 15:
          // Dynamically generate username based on role and mobile number
          username = user.username; // Default to current username
          if (!mobile_number) {
            _context4.next = 31;
            break;
          }
          _context4.t0 = role.role_name;
          _context4.next = _context4.t0 === 'Area Development Officer' ? 20 : _context4.t0 === 'Master Distributor' ? 22 : _context4.t0 === 'Super Distributor' ? 24 : _context4.t0 === 'Distributor' ? 26 : _context4.t0 === 'Customer' ? 28 : 30;
          break;
        case 20:
          username = "ado_".concat(mobile_number);
          return _context4.abrupt("break", 31);
        case 22:
          username = "md_".concat(mobile_number);
          return _context4.abrupt("break", 31);
        case 24:
          username = "sd_".concat(mobile_number);
          return _context4.abrupt("break", 31);
        case 26:
          username = "d_".concat(mobile_number);
          return _context4.abrupt("break", 31);
        case 28:
          username = "c_".concat(mobile_number);
          return _context4.abrupt("break", 31);
        case 30:
          username = mobile_number;
        case 31:
          if (!(!username || !email || !role_id || !mobile_number)) {
            _context4.next = 33;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Required fields must be provided (username, email, role_id, mobile_number).'
          }));
        case 33:
          // Handle superior_id validation based on the role
          finalSuperiorId = superior_id; // Ensure that only the Admin or higher roles can have a superior_id
          if (!(role.role_name !== 'Admin' && role.role_name !== 'Area Development Officer' && !superior_id)) {
            _context4.next = 36;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Superior ID is required for hierarchical users.'
          }));
        case 36:
          if (!(role.role_name === 'Area Development Officer')) {
            _context4.next = 46;
            break;
          }
          if (superior_id) {
            _context4.next = 41;
            break;
          }
          finalSuperiorId = loggedInUserId; // Use the logged-in Admin's ID
          _context4.next = 46;
          break;
        case 41:
          _context4.next = 43;
          return User.findOne({
            where: {
              role_name: 'Admin',
              id: superior_id
            }
          });
        case 43:
          adminUser = _context4.sent;
          if (adminUser) {
            _context4.next = 46;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Admin ID not valid or Admin not found.'
          }));
        case 46:
          if (!superior_id) {
            _context4.next = 62;
            break;
          }
          _context4.next = 49;
          return User.findByPk(superior_id);
        case 49:
          superiorUser = _context4.sent;
          if (superiorUser) {
            _context4.next = 52;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Superior user not found.'
          }));
        case 52:
          if (!(superiorUser.role_name === 'Admin')) {
            _context4.next = 58;
            break;
          }
          // Admin can supervise only specific roles
          allowedRolesForAdmin = ['Area Development Officer', 'Master Distributor', 'Super Distributor'];
          if (allowedRolesForAdmin.includes(role.role_name)) {
            _context4.next = 56;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Invalid superior ID; Admin cannot supervise this role.'
          }));
        case 56:
          _context4.next = 62;
          break;
        case 58:
          // Other regular roles should follow the role hierarchy
          roleHierarchy = {
            1: ['2', '3', '4', '5', '6'],
            // Admin can supervise all roles
            2: ['3', '4', '5', '6'],
            // Area Development Officer can supervise lower roles
            3: ['4', '5', '6'],
            // Master Distributor can supervise certain lower roles
            4: ['5', '6'],
            // Super Distributor can supervise Distributor and Customer
            5: ['6'],
            // Distributor can only supervise Customer
            6: [] // Customer cannot supervise anyone
          };
          allowedRoles = roleHierarchy[superiorUser.role_id];
          if (allowedRoles.includes(role_id.toString())) {
            _context4.next = 62;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Superior user role cannot supervise this role.'
          }));
        case 62:
          _context4.next = 64;
          return User.findOne({
            where: _defineProperty(_defineProperty({}, Op.or, [{
              username: username
            }, {
              email: email
            }, {
              mobile_number: mobile_number
            }]), "id", _defineProperty({}, Op.ne, userId))
          });
        case 64:
          existingUser = _context4.sent;
          if (!existingUser) {
            _context4.next = 72;
            break;
          }
          if (!(existingUser.username === username)) {
            _context4.next = 68;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Username already in use.'
          }));
        case 68:
          if (!(existingUser.email === email)) {
            _context4.next = 70;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Email already in use.'
          }));
        case 70:
          if (!(existingUser.mobile_number === mobile_number)) {
            _context4.next = 72;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'Mobile number already in use.'
          }));
        case 72:
          // Hash the password if provided
          // let hashedPassword = user.password;
          // if (password) {
          //   hashedPassword = await bcrypt.hash(password, 10);
          // }
          encryptedPassword = user.password; // Use the existing encrypted password
          if (password) {
            encryptedPassword = encryptPassword(password);
          }

          // Validate and process image file (if provided)
          allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
          imageFilename = user.image;
          if (!req.file) {
            _context4.next = 82;
            break;
          }
          if (allowedFormats.includes(req.file.mimetype)) {
            _context4.next = 79;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid image format. Only JPEG, PNG, and GIF are allowed.'
          }));
        case 79:
          if (!(req.file.size > 2 * 1024 * 1024)) {
            _context4.next = 81;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            success: false,
            message: 'Image size exceeds 2MB limit.'
          }));
        case 81:
          imageFilename = req.file.filename;
        case 82:
          _context4.next = 84;
          return user.update({
            username: username,
            // password: hashedPassword,
            password: encryptedPassword,
            email: email,
            role_id: role_id,
            superior_id: finalSuperiorId,
            pincode: pincode,
            state: state,
            city: city,
            street_name: street_name,
            building_no_name: building_no_name,
            mobile_number: mobile_number,
            full_name: full_name,
            gst_number: gst_number,
            status: status,
            club_name: club_name,
            role_name: role.role_name,
            image: imageFilename,
            country: country,
            district: district
          });
        case 84:
          return _context4.abrupt("return", res.status(200).json({
            message: 'User updated successfully.',
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              role_id: user.role_id,
              role_name: role.role_name,
              superior_id: user.superior_id,
              pincode: user.pincode,
              state: user.state,
              city: user.city,
              street_name: user.street_name,
              building_no_name: user.building_no_name,
              mobile_number: user.mobile_number,
              full_name: user.full_name,
              gst_number: user.gst_number,
              status: user.status,
              club_name: user.club_name,
              image: user.image,
              country: user.country,
              district: user.district,
              updatedAt: user.updatedAt
            }
          }));
        case 87:
          _context4.prev = 87;
          _context4.t1 = _context4["catch"](0);
          console.error('Error updating user:', _context4.t1.message);
          return _context4.abrupt("return", res.status(500).json({
            error: _context4.t1.message || 'An error occurred while updating the user.'
          }));
        case 91:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 87]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getUserById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userID, user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userID = req.params.userID; // Correctly extract the parameter
          // Validate that userID is provided
          if (userID) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: 'User ID is required'
          }));
        case 4:
          _context5.next = 6;
          return User.findOne({
            where: {
              id: userID
            },
            // Use the correct parameter
            include: [{
              model: Role,
              // Include the Role model
              attributes: {
                exclude: []
              } // Include all attributes from Role
            }]
          });
        case 6:
          user = _context5.sent;
          if (user) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));
        case 9:
          res.status(200).json(user); // Return the user details
          _context5.next = 16;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          console.error('Error fetching user by ID:', _context5.t0);
          res.status(500).json({
            error: 'An error occurred while fetching user details'
          });
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Admin Read API: Get all users in hierarchical format
exports.getAllUsers = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var users, userHierarchy, response;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return User.findAll({
            attributes: {
              exclude: ['password']
            }
          });
        case 3:
          users = _context6.sent;
          // Structure users into hierarchy
          userHierarchy = {};
          users.forEach(function (user) {
            var role = user.role_name;
            if (!userHierarchy[role]) {
              userHierarchy[role] = [];
            }
            userHierarchy[role].push(user);
          });

          // Build a structured response
          response = {
            Admins: userHierarchy.Admin || [],
            ADOs: userHierarchy['Area Development Officer'] || [],
            MDs: userHierarchy['Master Distributor'] || [],
            SDs: userHierarchy['Super Distributor'] || [],
            Ds: userHierarchy.Distributor || [],
            Cs: userHierarchy.Customer || []
          };
          res.status(200).json(response);
          _context6.next = 14;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error('Error fetching all users:', _context6.t0);
          res.status(500).json({
            error: 'An error occurred while fetching users'
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// API to get users by role
exports.getUsersByRole = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var role_id, role, users;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          role_id = req.query.role_id; // Validate role_id
          if (role_id) {
            _context7.next = 4;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            error: 'Role ID is required'
          }));
        case 4:
          _context7.next = 6;
          return Role.findByPk(role_id);
        case 6:
          role = _context7.sent;
          if (role) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            error: 'Invalid Role ID'
          }));
        case 9:
          _context7.next = 11;
          return User.findAll({
            where: {
              role_id: role_id
            },
            attributes: ['id', 'username', 'mobile_number', 'email', 'full_name', 'role_id', 'role_name', 'superior_id', 'image']
          });
        case 11:
          users = _context7.sent;
          if (!(users.length === 0)) {
            _context7.next = 14;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'No users found for the given role'
          }));
        case 14:
          res.status(200).json(users);
          _context7.next = 20;
          break;
        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            error: _context7.t0.message
          });
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 17]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// Delete a user
exports.deleteUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          userId = req.params.userId; // Get the user ID from request params
          // Check if the user exists
          _context8.next = 4;
          return User.findByPk(userId);
        case 4:
          user = _context8.sent;
          if (user) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));
        case 7:
          _context8.next = 9;
          return User.destroy({
            where: {
              id: userId
            }
          });
        case 9:
          res.status(200).json({
            message: 'User deleted successfully'
          });
          _context8.next = 16;
          break;
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](0);
          console.error('Error deleting user:', _context8.t0);
          res.status(500).json({
            error: 'An error occurred while deleting the user'
          });
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 12]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getUserCounts = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var memberID, user, loggedInUserRole, conditions, mdUsers, mdCount, sdUsers, sdCount, distributorUsers, distributorCount, customerUsers, customerCount, adoUsers, adoCount;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          console.log("Received userId:", req.params.userId); // Debug log
          memberID = req.params.userId; // Use userId from the route params
          if (memberID) {
            _context9.next = 5;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            error: 'Member ID is required'
          }));
        case 5:
          _context9.next = 7;
          return User.findOne({
            where: {
              id: memberID
            }
          });
        case 7:
          user = _context9.sent;
          if (user) {
            _context9.next = 10;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));
        case 10:
          loggedInUserRole = user.role_name;
          conditions = {}; // If the user is an Admin, fetch counts for all roles
          if (loggedInUserRole === 'Admin') {
            conditions = {}; // No filtering
          } else {
            // If the user is not an Admin, filter by their ID as superior_id
            conditions.superior_id = memberID;
          }

          // Fetch details for MDs (Master Distributors) along with their counts
          _context9.next = 15;
          return User.findAll({
            where: _objectSpread(_objectSpread({}, conditions), {}, {
              role_name: 'Master Distributor'
            }),
            attributes: ['id', 'role_id', 'image', 'full_name', 'role_name', 'city']
          });
        case 15:
          mdUsers = _context9.sent;
          mdCount = mdUsers.length; // Fetch details for SDs (Super Distributors) along with their counts
          _context9.next = 19;
          return User.findAll({
            where: _objectSpread(_objectSpread({}, conditions), {}, {
              role_name: 'Super Distributor'
            }),
            attributes: ['id', 'role_id', 'image', 'full_name', 'role_name', 'city']
          });
        case 19:
          sdUsers = _context9.sent;
          sdCount = sdUsers.length; // Fetch details for Distributors along with their counts
          _context9.next = 23;
          return User.findAll({
            where: _objectSpread(_objectSpread({}, conditions), {}, {
              role_name: 'Distributor'
            }),
            attributes: ['id', 'role_id', 'image', 'full_name', 'role_name', 'city']
          });
        case 23:
          distributorUsers = _context9.sent;
          distributorCount = distributorUsers.length; // Fetch details for Customers along with their counts
          _context9.next = 27;
          return User.findAll({
            where: _objectSpread(_objectSpread({}, conditions), {}, {
              role_name: 'Customer'
            }),
            attributes: ['id', 'role_id', 'image', 'full_name', 'role_name', 'city']
          });
        case 27:
          customerUsers = _context9.sent;
          customerCount = customerUsers.length; // Fetch details for ADOs (Area Development Officers) along with their counts
          _context9.next = 31;
          return User.findAll({
            where: _objectSpread(_objectSpread({}, conditions), {}, {
              role_name: 'Area Development Officer'
            }),
            attributes: ['id', 'role_id', 'image', 'full_name', 'role_name', 'city']
          });
        case 31:
          adoUsers = _context9.sent;
          adoCount = adoUsers.length;
          return _context9.abrupt("return", res.json({
            mdCount: mdCount,
            mdUsers: mdUsers,
            sdCount: sdCount,
            sdUsers: sdUsers,
            distributorCount: distributorCount,
            distributorUsers: distributorUsers,
            customerCount: customerCount,
            customerUsers: customerUsers,
            adoCount: adoCount,
            adoUsers: adoUsers
          }));
        case 36:
          _context9.prev = 36;
          _context9.t0 = _context9["catch"](0);
          console.error('Error fetching user counts:', _context9.t0);
          return _context9.abrupt("return", res.status(500).json({
            error: 'An error occurred while fetching the counts.'
          }));
        case 40:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 36]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();