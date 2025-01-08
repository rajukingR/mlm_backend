"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require('../../../models'),
  Order = _require.Order,
  Product = _require.Product,
  OrderItem = _require.OrderItem,
  User = _require.User,
  SalesStockTarget = _require.SalesStockTarget;
var _require2 = require('sequelize'),
  Op = _require2.Op;
var _require3 = require('../../../models'),
  sequelize = _require3.sequelize;
exports.getOverallSalesCalculation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var USER_ROLE_NAME, Distributor_ROLE_ID, roles, result, customers, totalUsers, orders, totalBuyedAmount, totalStockBuyed, _iterator, _step, order, _iterator2, _step2, _orderItem$product, orderItem, filteredRoles, _iterator3, _step3, role, users, _totalUsers, roleTarget, targetAmount, targetStock, _orders, totalSalesAmount, totalStockAchieved, _iterator4, _step4, _order, _iterator5, _step5, _orderItem, product, price, pendingAmount, pendingStock, salesAchievementPercent, stockAchievementPercent;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          USER_ROLE_NAME = req.user.role_name; // Logged-in user's role
          Distributor_ROLE_ID = req.user.id; // Logged-in Distributor's ID
          // Check if the role is 'Customer' and restrict access
          if (!(USER_ROLE_NAME === 'Customer')) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(403).json({
            success: false,
            message: 'You do not have access to this information.'
          }));
        case 5:
          roles = ['Area Development Officer', 'Master Distributor', 'Super Distributor', 'Distributor'];
          result = []; // Distributor-specific logic
          if (!(USER_ROLE_NAME === 'Distributor')) {
            _context.next = 21;
            break;
          }
          _context.next = 10;
          return User.findAll({
            where: {
              superior_id: Distributor_ROLE_ID,
              role_name: 'Customer'
            }
          });
        case 10:
          customers = _context.sent;
          totalUsers = customers.length; // Fetch accepted orders for customers under this Distributor
          _context.next = 14;
          return Order.findAll({
            where: {
              user_id: customers.map(function (customer) {
                return customer.id;
              }),
              status: 'Accepted'
            },
            include: [{
              model: OrderItem,
              as: 'OrderItems',
              include: {
                model: Product,
                as: 'product',
                required: true
              }
            }]
          });
        case 14:
          orders = _context.sent;
          // Calculate total buy amount and stock
          totalBuyedAmount = 0;
          totalStockBuyed = 0;
          _iterator = _createForOfIteratorHelper(orders);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              order = _step.value;
              _iterator2 = _createForOfIteratorHelper(order.OrderItems);
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  orderItem = _step2.value;
                  totalBuyedAmount += (((_orderItem$product = orderItem.product) === null || _orderItem$product === void 0 ? void 0 : _orderItem$product.price) || 0) * (parseInt(orderItem.quantity) || 0);
                  totalStockBuyed += parseInt(orderItem.quantity) || 0;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }

            // Push the result for the Distributor's customer stats
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          result.push({
            roleName: 'Customer',
            totalUsers: totalUsers,
            totalBuyedAmount: totalBuyedAmount,
            totalStockBuyed: totalStockBuyed
          });
          return _context.abrupt("return", res.status(200).json({
            success: true,
            result: result
          }));
        case 21:
          // Filtering roles based on user role
          filteredRoles = roles.filter(function (role) {
            if (USER_ROLE_NAME === 'Admin') return true; // Admin sees all roles
            if (USER_ROLE_NAME === 'Area Development Officer' && role !== 'Area Development Officer') return true;
            if (USER_ROLE_NAME === 'Master Distributor' && !['Area Development Officer', 'Master Distributor'].includes(role)) return true;
            if (USER_ROLE_NAME === 'Super Distributor' && !['Area Development Officer', 'Master Distributor', 'Super Distributor'].includes(role)) return true;
            return false; // Exclude all other roles
          });
          _iterator3 = _createForOfIteratorHelper(filteredRoles);
          _context.prev = 23;
          _iterator3.s();
        case 25:
          if ((_step3 = _iterator3.n()).done) {
            _context.next = 93;
            break;
          }
          role = _step3.value;
          _context.next = 29;
          return User.findAll({
            where: {
              role_name: role
            }
          });
        case 29:
          users = _context.sent;
          _totalUsers = users.length; // Fetch role-specific sales and stock targets
          _context.next = 33;
          return SalesStockTarget.findOne({
            where: {
              role_name: role
            }
          });
        case 33:
          roleTarget = _context.sent;
          targetAmount = parseFloat((roleTarget === null || roleTarget === void 0 ? void 0 : roleTarget.target) || 0) * _totalUsers;
          targetStock = parseFloat((roleTarget === null || roleTarget === void 0 ? void 0 : roleTarget.stock_target) || 0) * _totalUsers; // Fetch accepted orders for users in this role
          _context.next = 38;
          return Order.findAll({
            where: {
              higher_role_id: users.map(function (user) {
                return user.id;
              }),
              status: 'Accepted'
            },
            include: [{
              model: OrderItem,
              as: 'OrderItems',
              include: {
                model: Product,
                as: 'product',
                required: true
              }
            }]
          });
        case 38:
          _orders = _context.sent;
          // Calculate achieved sales amount and stock
          totalSalesAmount = 0;
          totalStockAchieved = 0;
          _iterator4 = _createForOfIteratorHelper(_orders);
          _context.prev = 42;
          _iterator4.s();
        case 44:
          if ((_step4 = _iterator4.n()).done) {
            _context.next = 78;
            break;
          }
          _order = _step4.value;
          _iterator5 = _createForOfIteratorHelper(_order.OrderItems);
          _context.prev = 47;
          _iterator5.s();
        case 49:
          if ((_step5 = _iterator5.n()).done) {
            _context.next = 68;
            break;
          }
          _orderItem = _step5.value;
          product = _orderItem.product;
          price = 0; // Determine price based on role
          _context.t0 = role;
          _context.next = _context.t0 === 'Area Development Officer' ? 56 : _context.t0 === 'Master Distributor' ? 58 : _context.t0 === 'Super Distributor' ? 60 : _context.t0 === 'Distributor' ? 62 : 64;
          break;
        case 56:
          price = product.adoPrice || 0;
          return _context.abrupt("break", 64);
        case 58:
          price = product.mdPrice || 0;
          return _context.abrupt("break", 64);
        case 60:
          price = product.sdPrice || 0;
          return _context.abrupt("break", 64);
        case 62:
          price = product.distributorPrice || 0;
          return _context.abrupt("break", 64);
        case 64:
          totalSalesAmount += price * (parseInt(_orderItem.quantity) || 0);
          totalStockAchieved += parseInt(_orderItem.quantity) || 0;
        case 66:
          _context.next = 49;
          break;
        case 68:
          _context.next = 73;
          break;
        case 70:
          _context.prev = 70;
          _context.t1 = _context["catch"](47);
          _iterator5.e(_context.t1);
        case 73:
          _context.prev = 73;
          _iterator5.f();
          return _context.finish(73);
        case 76:
          _context.next = 44;
          break;
        case 78:
          _context.next = 83;
          break;
        case 80:
          _context.prev = 80;
          _context.t2 = _context["catch"](42);
          _iterator4.e(_context.t2);
        case 83:
          _context.prev = 83;
          _iterator4.f();
          return _context.finish(83);
        case 86:
          // Calculate pending amounts and percentages
          pendingAmount = Math.max(targetAmount - totalSalesAmount, 0);
          pendingStock = Math.max(targetStock - totalStockAchieved, 0);
          salesAchievementPercent = Math.min(Math.max(targetAmount > 0 ? totalSalesAmount / targetAmount * 100 : 0, 0), 100);
          stockAchievementPercent = Math.min(Math.max(targetStock > 0 ? totalStockAchieved / targetStock * 100 : 0, 0), 100);
          result.push({
            roleName: role,
            totalUsers: _totalUsers,
            targetAmount: targetAmount,
            targetStock: targetStock,
            totalSalesAmount: totalSalesAmount,
            totalStockAchieved: totalStockAchieved,
            pendingAmount: pendingAmount,
            pendingStock: pendingStock,
            salesAchievementPercent: salesAchievementPercent.toFixed(2),
            stockAchievementPercent: stockAchievementPercent.toFixed(2)
          });
        case 91:
          _context.next = 25;
          break;
        case 93:
          _context.next = 98;
          break;
        case 95:
          _context.prev = 95;
          _context.t3 = _context["catch"](23);
          _iterator3.e(_context.t3);
        case 98:
          _context.prev = 98;
          _iterator3.f();
          return _context.finish(98);
        case 101:
          return _context.abrupt("return", res.status(200).json({
            success: true,
            result: result
          }));
        case 104:
          _context.prev = 104;
          _context.t4 = _context["catch"](0);
          console.error('Error calculating overall sales:', _context.t4);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to calculate overall sales',
            error: _context.t4.message
          }));
        case 108:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 104], [23, 95, 98, 101], [42, 80, 83, 86], [47, 70, 73, 76]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//////////*******Most selleing Product API********////////////

var moment = require('moment');
exports.getMostSellingProductPercentage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var USER_ID, startOfMonth, endOfMonth, orders, totalSales, productSales, _iterator6, _step6, order, _iterator7, _step7, orderItem, product, quantity, price, salesAmount, productPercentages;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          USER_ID = req.user.id;
          _context2.prev = 1;
          // Get the start and end date for the current month
          startOfMonth = moment().startOf('month').toDate();
          endOfMonth = moment().endOf('month').toDate(); // Fetch all accepted orders for the current month made by the user
          _context2.next = 6;
          return Order.findAll({
            where: {
              higher_role_id: USER_ID,
              // Assuming the 'higher_role_id' is the ID of the user
              status: 'Accepted',
              created_at: _defineProperty({}, Op.between, [startOfMonth, endOfMonth])
            },
            include: [{
              model: OrderItem,
              as: 'OrderItems',
              include: {
                model: Product,
                as: 'product',
                required: true
              }
            }]
          });
        case 6:
          orders = _context2.sent;
          if (!(!orders || orders.length === 0)) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: 'No orders found for the current month'
          }));
        case 9:
          // Step 1: Calculate total sales for the current month
          totalSales = 0;
          productSales = {}; // object to store sales by product
          // Iterate over orders and calculate product-wise sales
          _iterator6 = _createForOfIteratorHelper(orders);
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              order = _step6.value;
              _iterator7 = _createForOfIteratorHelper(order.OrderItems);
              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  orderItem = _step7.value;
                  product = orderItem.product;
                  quantity = parseInt(orderItem.quantity) || 0;
                  price = product.price || 0; // assuming product price field is present
                  salesAmount = quantity * price;
                  totalSales += salesAmount;
                  if (product.id in productSales) {
                    productSales[product.id].sales += salesAmount;
                    productSales[product.id].quantity += quantity;
                  } else {
                    productSales[product.id] = {
                      productName: product.name,
                      sales: salesAmount,
                      quantity: quantity
                    };
                  }
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
            }

            // Step 2: Calculate percentage for each product
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
          productPercentages = Object.keys(productSales).map(function (productId) {
            var product = productSales[productId];
            var productPercentage = product.sales / totalSales * 100;
            return {
              productName: product.productName,
              sales: product.sales,
              percentage: productPercentage.toFixed(2)
            };
          }); // Step 3: Sort products by percentage in descending order
          productPercentages.sort(function (a, b) {
            return b.percentage - a.percentage;
          });
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            mostSellingProducts: productPercentages
          }));
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](1);
          console.error('Error fetching most selling product percentage:', _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch product percentage',
            error: _context2.t0.message
          }));
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 18]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/////////////***********Get Sales Trent************//////////

exports.salesOverTime = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$user, USER_ROLE_NAME, USER_ID, _req$body, startMonth, endMonth, startDate, endDate, whereCondition, orders, productSales, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // exports.getProductSalesQuantityByMonths = async (req, res) => {
          _req$user = req.user, USER_ROLE_NAME = _req$user.role_name, USER_ID = _req$user.id;
          _req$body = req.body, startMonth = _req$body.startMonth, endMonth = _req$body.endMonth;
          _context3.prev = 2;
          if (!(!startMonth || !endMonth)) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: 'Please provide both startMonth and endMonth in the request body.'
          }));
        case 5:
          // Parse the input months to get start and end dates
          startDate = new Date("".concat(startMonth, "-01"));
          endDate = new Date("".concat(endMonth, "-01"));
          endDate.setMonth(endDate.getMonth() + 1); // Include the entire end month
          if (!(startDate > endDate)) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid date range. Start month must be earlier than or equal to end month.'
          }));
        case 10:
          whereCondition = {
            created_at: _defineProperty({}, Op.between, [startDate, endDate]),
            status: 'Accepted'
          }; // Add user filter if not admin
          if (USER_ROLE_NAME !== 'Admin') {
            whereCondition.higher_role_id = USER_ID;
          }

          // Fetch orders within the specified range
          _context3.next = 14;
          return Order.findAll({
            where: whereCondition,
            include: [{
              model: OrderItem,
              as: 'OrderItems',
              include: {
                model: Product,
                as: 'product',
                required: true
              }
            }]
          });
        case 14:
          orders = _context3.sent;
          // Calculate product quantity sold
          productSales = {};
          orders.forEach(function (order) {
            order.OrderItems.forEach(function (orderItem) {
              var productName = orderItem.product.name;
              productSales[productName] = (productSales[productName] || 0) + (orderItem.quantity || 0);
            });
          });

          // Prepare response
          result = Object.entries(productSales).map(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
              productName = _ref5[0],
              quantity = _ref5[1];
            return {
              productName: productName,
              quantity: quantity
            };
          });
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            result: result,
            message: "Product sales quantity from ".concat(startMonth, " to ").concat(endMonth, ".")
          }));
        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](2);
          console.error('Error fetching product sales quantity:', _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch product sales quantity',
            error: _context3.t0.message
          }));
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 21]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

//////////*****Bar Graph, total stock&selled stock detail*******//////////

exports.getStockTargetDetails = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$user2, USER_ROLE_NAME, USER_ID, currentDate, months, i, date, result, adoUsers, totalAdoStockTarget, totalTargetStock, _iterator8, _step8, month, adoIds, adoOrders, totalSoldStock, _iterator9, _step9, order, _iterator10, _step10, orderItem, userTarget, _totalTargetStock, _iterator11, _step11, _month, userOrders, _totalSoldStock, _iterator12, _step12, _order2, _iterator13, _step13, _orderItem2;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$user2 = req.user, USER_ROLE_NAME = _req$user2.role_name, USER_ID = _req$user2.id; // Logged-in user's role and ID
          // Get the current date and the last 6 months
          currentDate = new Date();
          months = [];
          for (i = 0; i < 6; i++) {
            date = new Date(currentDate);
            date.setMonth(currentDate.getMonth() - i);
            months.push(date.toISOString().slice(0, 7)); // Format as YYYY-MM
          }
          result = [];
          if (!(USER_ROLE_NAME === 'Admin')) {
            _context4.next = 39;
            break;
          }
          _context4.next = 9;
          return User.findAll({
            where: {
              role_name: 'Area Development Officer'
            }
          });
        case 9:
          adoUsers = _context4.sent;
          _context4.next = 12;
          return SalesStockTarget.findOne({
            where: {
              role_name: 'Area Development Officer'
            }
          });
        case 12:
          totalAdoStockTarget = _context4.sent;
          totalTargetStock = adoUsers.length * ((totalAdoStockTarget === null || totalAdoStockTarget === void 0 ? void 0 : totalAdoStockTarget.stock_target) || 0); // For each month, calculate total sold stock for ADOs
          _iterator8 = _createForOfIteratorHelper(months);
          _context4.prev = 15;
          _iterator8.s();
        case 17:
          if ((_step8 = _iterator8.n()).done) {
            _context4.next = 29;
            break;
          }
          month = _step8.value;
          adoIds = adoUsers.map(function (user) {
            return user.id;
          });
          _context4.next = 22;
          return Order.findAll({
            where: {
              user_id: adoIds,
              status: 'Accepted',
              createdAt: _defineProperty(_defineProperty({}, Op.gte, new Date("".concat(month, "-01"))), Op.lt, new Date(new Date("".concat(month, "-01")).setMonth(new Date("".concat(month, "-01")).getMonth() + 1)))
            },
            include: [{
              model: OrderItem,
              as: 'OrderItems'
            }]
          });
        case 22:
          adoOrders = _context4.sent;
          totalSoldStock = 0;
          _iterator9 = _createForOfIteratorHelper(adoOrders);
          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              order = _step9.value;
              _iterator10 = _createForOfIteratorHelper(order.OrderItems);
              try {
                for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                  orderItem = _step10.value;
                  totalSoldStock += parseInt(orderItem.quantity) || 0;
                }
              } catch (err) {
                _iterator10.e(err);
              } finally {
                _iterator10.f();
              }
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
          result.push({
            month: month,
            totalTargetStock: totalTargetStock,
            totalSoldStock: totalSoldStock
          });
        case 27:
          _context4.next = 17;
          break;
        case 29:
          _context4.next = 34;
          break;
        case 31:
          _context4.prev = 31;
          _context4.t0 = _context4["catch"](15);
          _iterator8.e(_context4.t0);
        case 34:
          _context4.prev = 34;
          _iterator8.f();
          return _context4.finish(34);
        case 37:
          _context4.next = 65;
          break;
        case 39:
          _context4.next = 41;
          return SalesStockTarget.findOne({
            where: {
              role_name: USER_ROLE_NAME
            }
          });
        case 41:
          userTarget = _context4.sent;
          _totalTargetStock = (userTarget === null || userTarget === void 0 ? void 0 : userTarget.stock_target) || 0; // For each month, fetch sold stock for this user
          _iterator11 = _createForOfIteratorHelper(months);
          _context4.prev = 44;
          _iterator11.s();
        case 46:
          if ((_step11 = _iterator11.n()).done) {
            _context4.next = 57;
            break;
          }
          _month = _step11.value;
          _context4.next = 50;
          return Order.findAll({
            where: {
              user_id: USER_ID,
              status: 'Accepted',
              createdAt: _defineProperty(_defineProperty({}, Op.gte, new Date("".concat(_month, "-01"))), Op.lt, new Date(new Date("".concat(_month, "-01")).setMonth(new Date("".concat(_month, "-01")).getMonth() + 1)))
            },
            include: [{
              model: OrderItem,
              as: 'OrderItems'
            }]
          });
        case 50:
          userOrders = _context4.sent;
          _totalSoldStock = 0;
          _iterator12 = _createForOfIteratorHelper(userOrders);
          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              _order2 = _step12.value;
              _iterator13 = _createForOfIteratorHelper(_order2.OrderItems);
              try {
                for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                  _orderItem2 = _step13.value;
                  _totalSoldStock += parseInt(_orderItem2.quantity) || 0;
                }
              } catch (err) {
                _iterator13.e(err);
              } finally {
                _iterator13.f();
              }
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }
          result.push({
            month: _month,
            totalTargetStock: _totalTargetStock,
            totalSoldStock: _totalSoldStock
          });
        case 55:
          _context4.next = 46;
          break;
        case 57:
          _context4.next = 62;
          break;
        case 59:
          _context4.prev = 59;
          _context4.t1 = _context4["catch"](44);
          _iterator11.e(_context4.t1);
        case 62:
          _context4.prev = 62;
          _iterator11.f();
          return _context4.finish(62);
        case 65:
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            result: result
          }));
        case 68:
          _context4.prev = 68;
          _context4.t2 = _context4["catch"](0);
          console.error('Error fetching stock target details:', _context4.t2);
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch stock target details',
            error: _context4.t2.message
          }));
        case 72:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 68], [15, 31, 34, 37], [44, 59, 62, 65]]);
  }));
  return function (_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();