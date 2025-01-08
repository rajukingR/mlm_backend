"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
exports.getMonthlySalesDetails = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$params, role_id, user_id, user, userCreatedAt, currentDate, roleTarget, totalMonthlyTarget, totalStockTarget, monthlyDetails, getMonthsBetweenDates, months, _iterator, _step, targetDate, startOfMonth, endOfMonth, acceptedOrders, totalAchievementAmount, _iterator2, _step2, order, orderUser, roleName, _iterator3, _step3, orderItem, product, price, totalStockAchievement, pendingAmount, pendingStockTarget, achievementAmountPercent, unachievementAmountPercent, stockAchievementPercent, stockUnachievementPercent;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$params = req.params, role_id = _req$params.role_id, user_id = _req$params.user_id;
          _context.prev = 1;
          _context.next = 4;
          return User.findByPk(user_id);
        case 4:
          user = _context.sent;
          if (user) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            success: false,
            message: 'User not found'
          }));
        case 7:
          userCreatedAt = new Date(user.createdAt);
          currentDate = new Date(); // Fetch SalesStockTarget based on user's role_name
          _context.next = 11;
          return SalesStockTarget.findOne({
            where: {
              role_name: user.role_name
            }
          });
        case 11:
          roleTarget = _context.sent;
          if (roleTarget) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            success: false,
            message: 'Role target not found'
          }));
        case 14:
          totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
          totalStockTarget = parseFloat(roleTarget.stock_target) || 0; // Initialize results
          monthlyDetails = []; // Helper function to iterate month-by-month
          getMonthsBetweenDates = function getMonthsBetweenDates(start, end) {
            var months = [];
            var current = new Date(start);
            while (current <= end) {
              months.push(new Date(current));
              current.setMonth(current.getMonth() + 1);
            }
            return months;
          };
          months = getMonthsBetweenDates(userCreatedAt, currentDate);
          _iterator = _createForOfIteratorHelper(months);
          _context.prev = 20;
          _iterator.s();
        case 22:
          if ((_step = _iterator.n()).done) {
            _context.next = 92;
            break;
          }
          targetDate = _step.value;
          startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
          endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0); // Fetch all accepted orders for the user within the target month
          _context.next = 28;
          return Order.findAll({
            where: {
              higher_role_id: user_id,
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
        case 28:
          acceptedOrders = _context.sent;
          // Calculate total achievement amount
          totalAchievementAmount = 0;
          _iterator2 = _createForOfIteratorHelper(acceptedOrders);
          _context.prev = 31;
          _iterator2.s();
        case 33:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 74;
            break;
          }
          order = _step2.value;
          _context.next = 37;
          return User.findByPk(order.higher_role_id);
        case 37:
          orderUser = _context.sent;
          roleName = orderUser ? orderUser.role_name : '';
          _iterator3 = _createForOfIteratorHelper(order.OrderItems);
          _context.prev = 40;
          _iterator3.s();
        case 42:
          if ((_step3 = _iterator3.n()).done) {
            _context.next = 64;
            break;
          }
          orderItem = _step3.value;
          product = orderItem.product;
          price = 0;
          _context.t0 = roleName;
          _context.next = _context.t0 === 'Super Distributor' ? 49 : _context.t0 === 'Distributor' ? 51 : _context.t0 === 'Master Distributor' ? 53 : _context.t0 === 'Area Development Officer' ? 55 : _context.t0 === 'Customer' ? 57 : 59;
          break;
        case 49:
          price = product.sdPrice || 0;
          return _context.abrupt("break", 61);
        case 51:
          price = product.distributorPrice || 0;
          return _context.abrupt("break", 61);
        case 53:
          price = product.mdPrice || 0;
          return _context.abrupt("break", 61);
        case 55:
          price = product.adoPrice || 0;
          return _context.abrupt("break", 61);
        case 57:
          price = product.price || 0;
          return _context.abrupt("break", 61);
        case 59:
          price = 0;
          return _context.abrupt("break", 61);
        case 61:
          totalAchievementAmount += price * (parseInt(orderItem.quantity) || 0);
        case 62:
          _context.next = 42;
          break;
        case 64:
          _context.next = 69;
          break;
        case 66:
          _context.prev = 66;
          _context.t1 = _context["catch"](40);
          _iterator3.e(_context.t1);
        case 69:
          _context.prev = 69;
          _iterator3.f();
          return _context.finish(69);
        case 72:
          _context.next = 33;
          break;
        case 74:
          _context.next = 79;
          break;
        case 76:
          _context.prev = 76;
          _context.t2 = _context["catch"](31);
          _iterator2.e(_context.t2);
        case 79:
          _context.prev = 79;
          _iterator2.f();
          return _context.finish(79);
        case 82:
          // Calculate total stock achievement
          totalStockAchievement = acceptedOrders.reduce(function (total, order) {
            return total + order.OrderItems.reduce(function (subtotal, item) {
              return subtotal + (parseInt(item.quantity) || 0);
            }, 0);
          }, 0); // Ensure no negative values
          pendingAmount = Math.max(0, totalMonthlyTarget - totalAchievementAmount);
          pendingStockTarget = Math.max(0, totalStockTarget - totalStockAchievement); // Calculate percentages capped between 0 and 100
          achievementAmountPercent = Math.min(100, Math.max(0, totalAchievementAmount / totalMonthlyTarget * 100));
          unachievementAmountPercent = 100 - achievementAmountPercent;
          stockAchievementPercent = Math.min(100, Math.max(0, totalStockAchievement / totalStockTarget * 100));
          stockUnachievementPercent = 100 - stockAchievementPercent; // Add current month's details to the result
          monthlyDetails.push({
            month: startOfMonth.toLocaleString('default', {
              month: 'long'
            }),
            year: startOfMonth.getFullYear(),
            MonthlyTargetAmount: totalMonthlyTarget,
            AchievementAmount: totalAchievementAmount,
            pendingAmount: pendingAmount,
            achievementAmountPercent: achievementAmountPercent.toFixed(2),
            unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
            StockTarget: totalStockTarget,
            StockAchievement: totalStockAchievement,
            PendingStockTarget: pendingStockTarget,
            StockAchievementPercent: stockAchievementPercent.toFixed(2),
            StockUnachievementPercent: stockUnachievementPercent.toFixed(2)
          });
        case 90:
          _context.next = 22;
          break;
        case 92:
          _context.next = 97;
          break;
        case 94:
          _context.prev = 94;
          _context.t3 = _context["catch"](20);
          _iterator.e(_context.t3);
        case 97:
          _context.prev = 97;
          _iterator.f();
          return _context.finish(97);
        case 100:
          return _context.abrupt("return", res.status(200).json({
            success: true,
            role: user.role_name,
            user_id: user_id,
            monthlyDetails: monthlyDetails
          }));
        case 103:
          _context.prev = 103;
          _context.t4 = _context["catch"](1);
          console.error('Error fetching monthly sales details:', _context.t4);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch monthly sales details',
            error: _context.t4.message
          }));
        case 107:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 103], [20, 94, 97, 100], [31, 76, 79, 82], [40, 66, 69, 72]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getLowHierarchySalesDetails = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var user_id, lowerHierarchyUsers, result, _iterator4, _step4, user, role, photo, userCreatedAt, currentDate, totalMonthlyTarget, totalStockTarget, monthlyDetails, targetDate, startOfMonth, endOfMonth, roleTarget, acceptedOrders, totalAchievementAmount, totalStockAchievement, _iterator5, _step5, order, _iterator6, _step6, orderItem, product, price, achievementAmountPercent, unachievementAmountPercent, stockAchievementPercent, stockUnachievementPercent, pendingAmount, pendingStockTarget;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          user_id = req.params.user_id;
          _context2.prev = 1;
          _context2.next = 4;
          return User.findAll({
            where: {
              superior_id: user_id,
              role_name: _defineProperty({}, Op.ne, 'Customer')
            }
          });
        case 4:
          lowerHierarchyUsers = _context2.sent;
          if (!(!lowerHierarchyUsers || lowerHierarchyUsers.length === 0)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: 'No lower hierarchy users found'
          }));
        case 7:
          result = []; // Iterate over each lower hierarchy user
          _iterator4 = _createForOfIteratorHelper(lowerHierarchyUsers);
          _context2.prev = 9;
          _iterator4.s();
        case 11:
          if ((_step4 = _iterator4.n()).done) {
            _context2.next = 91;
            break;
          }
          user = _step4.value;
          role = user.role_name;
          photo = user.image;
          userCreatedAt = new Date(user.createdAt);
          currentDate = new Date();
          totalMonthlyTarget = 0;
          totalStockTarget = 0;
          monthlyDetails = [];
          targetDate = new Date(userCreatedAt);
        case 21:
          if (!(targetDate <= currentDate)) {
            _context2.next = 88;
            break;
          }
          startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
          endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0); // Fetch the SalesStockTarget for the current user's role
          _context2.next = 26;
          return SalesStockTarget.findOne({
            where: {
              role_name: role
            }
          });
        case 26:
          roleTarget = _context2.sent;
          if (roleTarget) {
            totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
            totalStockTarget = parseFloat(roleTarget.stock_target) || 0;
          }

          // Fetch accepted orders for the user within the month
          _context2.next = 30;
          return Order.findAll({
            where: {
              higher_role_id: user.id,
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
        case 30:
          acceptedOrders = _context2.sent;
          // Calculate total achievement amount and stock achievement
          totalAchievementAmount = 0;
          totalStockAchievement = 0;
          _iterator5 = _createForOfIteratorHelper(acceptedOrders);
          _context2.prev = 34;
          _iterator5.s();
        case 36:
          if ((_step5 = _iterator5.n()).done) {
            _context2.next = 70;
            break;
          }
          order = _step5.value;
          _iterator6 = _createForOfIteratorHelper(order.OrderItems);
          _context2.prev = 39;
          _iterator6.s();
        case 41:
          if ((_step6 = _iterator6.n()).done) {
            _context2.next = 60;
            break;
          }
          orderItem = _step6.value;
          product = orderItem.product;
          price = 0;
          _context2.t0 = role;
          _context2.next = _context2.t0 === 'Super Distributor' ? 48 : _context2.t0 === 'Distributor' ? 50 : _context2.t0 === 'Master Distributor' ? 52 : _context2.t0 === 'Area Development Officer' ? 54 : 56;
          break;
        case 48:
          price = product.sdPrice || 0;
          return _context2.abrupt("break", 56);
        case 50:
          price = product.distributorPrice || 0;
          return _context2.abrupt("break", 56);
        case 52:
          price = product.mdPrice || 0;
          return _context2.abrupt("break", 56);
        case 54:
          price = product.adoPrice || 0;
          return _context2.abrupt("break", 56);
        case 56:
          totalAchievementAmount += price * (parseInt(orderItem.quantity) || 0);
          totalStockAchievement += parseInt(orderItem.quantity) || 0;
        case 58:
          _context2.next = 41;
          break;
        case 60:
          _context2.next = 65;
          break;
        case 62:
          _context2.prev = 62;
          _context2.t1 = _context2["catch"](39);
          _iterator6.e(_context2.t1);
        case 65:
          _context2.prev = 65;
          _iterator6.f();
          return _context2.finish(65);
        case 68:
          _context2.next = 36;
          break;
        case 70:
          _context2.next = 75;
          break;
        case 72:
          _context2.prev = 72;
          _context2.t2 = _context2["catch"](34);
          _iterator5.e(_context2.t2);
        case 75:
          _context2.prev = 75;
          _iterator5.f();
          return _context2.finish(75);
        case 78:
          // Calculate percentages and ensure they're within valid bounds
          achievementAmountPercent = Math.min(Math.max(totalMonthlyTarget > 0 ? totalAchievementAmount / totalMonthlyTarget * 100 : 0, 0), 100);
          unachievementAmountPercent = Math.min(100 - achievementAmountPercent, 100);
          stockAchievementPercent = Math.min(Math.max(totalStockTarget > 0 ? totalStockAchievement / totalStockTarget * 100 : 0, 0), 100);
          stockUnachievementPercent = Math.min(100 - stockAchievementPercent, 100);
          pendingAmount = Math.max(totalMonthlyTarget - totalAchievementAmount, 0);
          pendingStockTarget = Math.max(totalStockTarget - totalStockAchievement, 0);
          monthlyDetails.push({
            month: startOfMonth.toLocaleString('default', {
              month: 'long'
            }),
            year: startOfMonth.getFullYear(),
            totalMonthlyTarget: totalMonthlyTarget,
            totalAchievementAmount: totalAchievementAmount,
            pendingAmount: pendingAmount,
            achievementAmountPercent: achievementAmountPercent.toFixed(2),
            unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
            totalStockTarget: totalStockTarget,
            totalStockAchievement: totalStockAchievement,
            pendingStockTarget: pendingStockTarget,
            stockAchievementPercent: stockAchievementPercent.toFixed(2),
            stockUnachievementPercent: stockUnachievementPercent.toFixed(2),
            roleName: role,
            roleId: user.role_id
          });
          targetDate.setMonth(targetDate.getMonth() + 1);
          _context2.next = 21;
          break;
        case 88:
          result.push({
            user_id: user.id,
            full_name: user.full_name,
            image: photo,
            monthlyDetails: monthlyDetails
          });
        case 89:
          _context2.next = 11;
          break;
        case 91:
          _context2.next = 96;
          break;
        case 93:
          _context2.prev = 93;
          _context2.t3 = _context2["catch"](9);
          _iterator4.e(_context2.t3);
        case 96:
          _context2.prev = 96;
          _iterator4.f();
          return _context2.finish(96);
        case 99:
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            result: result
          }));
        case 102:
          _context2.prev = 102;
          _context2.t4 = _context2["catch"](1);
          console.error('Error fetching lower hierarchy sales details:', _context2.t4);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch sales details',
            error: _context2.t4.message
          }));
        case 106:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 102], [9, 93, 96, 99], [34, 72, 75, 78], [39, 62, 65, 68]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

///****** User Sales Detail *******///

exports.getUserCurrentMonthSalesDetailsId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var user_id, user, role, photo, userCreatedAt, currentDate, totalMonthlyTarget, totalStockTarget, monthlyDetails, startOfMonth, endOfMonth, roleTarget, acceptedOrders, totalAchievementAmount, totalStockAchievement, _iterator7, _step7, order, _iterator8, _step8, orderItem, product, price, achievementAmountPercent, unachievementAmountPercent, stockAchievementPercent, stockUnachievementPercent, pendingAmount, pendingStockTarget;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          user_id = req.params.user_id;
          _context3.prev = 1;
          _context3.next = 4;
          return User.findOne({
            where: {
              id: user_id,
              role_name: _defineProperty({}, Op.ne, 'Customer') // Ensure the user is not a customer
            }
          });
        case 4:
          user = _context3.sent;
          if (user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: 'User not found'
          }));
        case 7:
          role = user.role_name;
          photo = user.image;
          userCreatedAt = new Date(user.createdAt);
          currentDate = new Date();
          totalMonthlyTarget = 0;
          totalStockTarget = 0;
          monthlyDetails = []; // Focus only on the current month
          startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Fetch the SalesStockTarget for the current user's role
          _context3.next = 18;
          return SalesStockTarget.findOne({
            where: {
              role_name: role
            }
          });
        case 18:
          roleTarget = _context3.sent;
          if (roleTarget) {
            totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
            totalStockTarget = parseFloat(roleTarget.stock_target) || 0;
          }

          // Fetch accepted orders for the user within the current month
          _context3.next = 22;
          return Order.findAll({
            where: {
              higher_role_id: user.id,
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
        case 22:
          acceptedOrders = _context3.sent;
          // Calculate total achievement amount and stock achievement for the current month
          totalAchievementAmount = 0;
          totalStockAchievement = 0;
          _iterator7 = _createForOfIteratorHelper(acceptedOrders);
          _context3.prev = 26;
          _iterator7.s();
        case 28:
          if ((_step7 = _iterator7.n()).done) {
            _context3.next = 62;
            break;
          }
          order = _step7.value;
          _iterator8 = _createForOfIteratorHelper(order.OrderItems);
          _context3.prev = 31;
          _iterator8.s();
        case 33:
          if ((_step8 = _iterator8.n()).done) {
            _context3.next = 52;
            break;
          }
          orderItem = _step8.value;
          product = orderItem.product;
          price = 0;
          _context3.t0 = role;
          _context3.next = _context3.t0 === 'Super Distributor' ? 40 : _context3.t0 === 'Distributor' ? 42 : _context3.t0 === 'Master Distributor' ? 44 : _context3.t0 === 'Area Development Officer' ? 46 : 48;
          break;
        case 40:
          price = product.sdPrice || 0;
          return _context3.abrupt("break", 48);
        case 42:
          price = product.distributorPrice || 0;
          return _context3.abrupt("break", 48);
        case 44:
          price = product.mdPrice || 0;
          return _context3.abrupt("break", 48);
        case 46:
          price = product.adoPrice || 0;
          return _context3.abrupt("break", 48);
        case 48:
          totalAchievementAmount += price * (parseInt(orderItem.quantity) || 0);
          totalStockAchievement += parseInt(orderItem.quantity) || 0;
        case 50:
          _context3.next = 33;
          break;
        case 52:
          _context3.next = 57;
          break;
        case 54:
          _context3.prev = 54;
          _context3.t1 = _context3["catch"](31);
          _iterator8.e(_context3.t1);
        case 57:
          _context3.prev = 57;
          _iterator8.f();
          return _context3.finish(57);
        case 60:
          _context3.next = 28;
          break;
        case 62:
          _context3.next = 67;
          break;
        case 64:
          _context3.prev = 64;
          _context3.t2 = _context3["catch"](26);
          _iterator7.e(_context3.t2);
        case 67:
          _context3.prev = 67;
          _iterator7.f();
          return _context3.finish(67);
        case 70:
          // Calculate percentages and ensure they're within valid bounds
          achievementAmountPercent = Math.min(Math.max(totalMonthlyTarget > 0 ? totalAchievementAmount / totalMonthlyTarget * 100 : 0, 0), 100);
          unachievementAmountPercent = Math.min(100 - achievementAmountPercent, 100);
          stockAchievementPercent = Math.min(Math.max(totalStockTarget > 0 ? totalStockAchievement / totalStockTarget * 100 : 0, 0), 100);
          stockUnachievementPercent = Math.min(100 - stockAchievementPercent, 100);
          pendingAmount = Math.max(totalMonthlyTarget - totalAchievementAmount, 0);
          pendingStockTarget = Math.max(totalStockTarget - totalStockAchievement, 0);
          monthlyDetails.push({
            month: startOfMonth.toLocaleString('default', {
              month: 'long'
            }),
            year: startOfMonth.getFullYear(),
            totalMonthlyTarget: totalMonthlyTarget,
            totalAchievementAmount: totalAchievementAmount,
            pendingAmount: pendingAmount,
            achievementAmountPercent: achievementAmountPercent.toFixed(2),
            unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
            totalStockTarget: totalStockTarget,
            totalStockAchievement: totalStockAchievement,
            pendingStockTarget: pendingStockTarget,
            stockAchievementPercent: stockAchievementPercent.toFixed(2),
            stockUnachievementPercent: stockUnachievementPercent.toFixed(2),
            roleName: role,
            roleId: user.role_id
          });
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            user_id: user.id,
            full_name: user.full_name,
            image: photo,
            monthlyDetails: monthlyDetails
          }));
        case 80:
          _context3.prev = 80;
          _context3.t3 = _context3["catch"](1);
          console.error('Error fetching current month sales details:', _context3.t3);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch sales details',
            error: _context3.t3.message
          }));
        case 84:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 80], [26, 64, 67, 70], [31, 54, 57, 60]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// const { Order, Product, OrderItem, User, SalesStockTarget } = require('../../models');
// const { Op } = require('sequelize');

// exports.getMonthlySalesDetails = async (req, res) => {
//   const { role_id, user_id } = req.params;

//   try {
//     // Fetch user details for creation date
//     const user = await User.findByPk(user_id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const userCreatedAt = new Date(user.createdAt);
//     const currentDate = new Date();

//     // Fetch SalesStockTarget based on user's role_name
//     const roleTarget = await SalesStockTarget.findOne({
//       where: {
//         role_name: user.role_name,
//       },
//     });

//     if (!roleTarget) {
//       return res.status(404).json({ success: false, message: 'Role target not found' });
//     }

//     const totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
//     const totalStockTarget = parseFloat(roleTarget.stock_target) || 0;

//     // Initialize results
//     const monthlyDetails = [];

//     // Iterate month-by-month from userCreatedAt to the current month
//     let targetDate = new Date(userCreatedAt);
//     while (targetDate <= currentDate) {
//       const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
//       const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

//       // Fetch all accepted orders for the user within the target month
//       const acceptedOrders = await Order.findAll({
//         where: {
//           higher_role_id: user_id,
//           status: 'Accepted',
//           created_at: { [Op.between]: [startOfMonth, endOfMonth] }, // Filter by month range
//         },
//         include: [
//           {
//             model: OrderItem,
//             as: 'OrderItems',
//             include: {
//               model: Product,
//               as: 'product',
//               required: true,
//             },
//           },
//         ],
//       });

//       // Calculate total achievement amount
//       const totalAchievementAmount = await acceptedOrders.reduce(async (totalPromise, order) => {
//         let total = await totalPromise;

//         const user = await User.findByPk(order.higher_role_id);
//         const roleName = user ? user.role_name : '';

//         order.OrderItems.forEach((orderItem) => {
//           const product = orderItem.product;

//           let price = 0;
//           switch (roleName) {
//             case 'Super Distributor':
//               price = product.sdPrice || 0;
//               break;
//             case 'Distributor':
//               price = product.distributorPrice || 0;
//               break;
//             case 'Master Distributor':
//               price = product.mdPrice || 0;
//               break;
//             case 'Area Development Officer':
//               price = product.adoPrice || 0;
//               break;
//             case 'Customer':
//               price = product.price || 0;
//               break;
//             default:
//               price = 0;
//               break;
//           }

//           const orderTotal = price * (parseInt(orderItem.quantity) || 0);
//           total += orderTotal;
//         });

//         return total;
//       }, Promise.resolve(0));

//       // Calculate total stock achievement
//       const totalStockAchievement = acceptedOrders.reduce((total, order) => {
//         return total + order.OrderItems.reduce((subtotal, item) => subtotal + (parseInt(item.quantity) || 0), 0);
//       }, 0);

//       // Calculate pending amount
//       const pendingAmount = totalMonthlyTarget - totalAchievementAmount;
//       const pendingStockTarget = totalStockTarget - totalStockAchievement;

//       // Calculate achievement and unachievement percentages
//       const achievementAmountPercent =
//         totalMonthlyTarget > 0 ? (totalAchievementAmount / totalMonthlyTarget) * 100 : 0;
//       const unachievementAmountPercent = 100 - achievementAmountPercent;

//       // Add current month's details to the result
//       monthlyDetails.push({
//         month: startOfMonth.toLocaleString('default', { month: 'long' }),
//         year: startOfMonth.getFullYear(),
//         MonthlyTargetAmount: totalMonthlyTarget,
//         AchievementAmount: totalAchievementAmount,
//         pendingAmount,
//         achievementAmountPercent: achievementAmountPercent.toFixed(2),
//         unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
//         StockTarget: totalStockTarget,
//         StockAchievement: totalStockAchievement,
//         PendingStockTarget: pendingStockTarget,
//         // StockAchievementPercent: totalStockTarget > 0 ? ((totalStockAchievement / totalStockTarget) * 100).toFixed(2) : '0.00',
//         StockAchievementPercent: totalStockTarget > 0 ? ((totalStockAchievement / totalStockTarget) * 100).toFixed(4) : '0.0000',

//         StockUnachievementPercent: totalStockTarget > 0 ? (100 - (totalStockAchievement / totalStockTarget) * 100).toFixed(2) : '100.00',
//       });

//       // Move to the next month
//       targetDate.setMonth(targetDate.getMonth() + 1);
//     }

//     // Respond with the monthly details
//     return res.status(200).json({
//       success: true,
//       role: user.role_name,
//       user_id,
//       monthlyDetails,
//     });
//   } catch (error) {
//     console.error('Error fetching monthly sales details:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch monthly sales details',
//       error: error.message,
//     });
//   }
// };

////////*******************///////////
////////*******************///////////

// const { SalesTarget, Order, Product, OrderItem, User } = require('../../models');
// const { Op } = require('sequelize');

// exports.getLowHierarchySalesDetails = async (req, res) => {
//   const { user_id } = req.params;

//   try {
//     // Fetch users under the given user_id (lower hierarchy)
//     const lowerHierarchyUsers = await User.findAll({
//       where: {
//         superior_id: user_id,
//         role_name: { [Op.ne]: 'Customer' }
//       },
//     });

//     if (!lowerHierarchyUsers || lowerHierarchyUsers.length === 0) {
//       return res.status(404).json({ success: false, message: 'No lower hierarchy users found' });
//     }

//     const result = [];

//     // Iterate over each lower hierarchy user
//     for (const user of lowerHierarchyUsers) {
//       const role = user.role_name;
//       const photo = user.image;
//       const userCreatedAt = new Date(user.createdAt);
//       const currentDate = new Date();

//       let totalMonthlyTarget = 0;
//       let totalStockTarget = 0;
//       const monthlyDetails = [];

//       let targetDate = new Date(userCreatedAt);
//       while (targetDate <= currentDate) {
//         const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
//         const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

//         // Fetch the SalesStockTarget for the current user's role
//         const roleTarget = await SalesStockTarget.findOne({
//           where: {
//             role_name: role,
//           },
//         });

//         if (roleTarget) {
//           totalMonthlyTarget = parseFloat(roleTarget.target) || 0;
//           totalStockTarget = parseFloat(roleTarget.stock_target) || 0;
//         } else {
//           totalMonthlyTarget = 0;
//           totalStockTarget = 0;
//         }

//         // Fetch accepted orders for the user within the month
//         const acceptedOrders = await Order.findAll({
//           where: {
//             higher_role_id: user.id,
//             status: 'Accepted',
//             created_at: { [Op.between]: [startOfMonth, endOfMonth] },
//           },
//           include: [
//             {
//               model: OrderItem,
//               as: 'OrderItems',
//               include: {
//                 model: Product,
//                 as: 'product',
//                 required: true,
//               },
//             },
//           ],
//         });

//         // Calculate total achievement amount and stock achievement
//         let totalAchievementAmount = 0;
//         let totalStockAchievement = 0;

//         for (const order of acceptedOrders) {
//           const user = await User.findByPk(order.higher_role_id);
//           const roleName = user ? user.role_name : '';

//           for (const orderItem of order.OrderItems) {
//             const product = orderItem.product;
//             let price = 0;

//             switch (roleName) {
//               case 'Super Distributor':
//                 price = product.sdPrice || 0;
//                 break;
//               case 'Distributor':
//                 price = product.distributorPrice || 0;
//                 break;
//               case 'Master Distributor':
//                 price = product.mdPrice || 0;
//                 break;
//               case 'Area Development Officer':
//                 price = product.adoPrice || 0;
//                 break;
//             }

//             const orderTotal = price * (parseInt(orderItem.quantity) || 0);
//             totalAchievementAmount += orderTotal;
//             totalStockAchievement += parseInt(orderItem.quantity) || 0;
//           }
//         }

//         // Calculate percentages
//         const achievementAmountPercent =
//           totalMonthlyTarget > 0 ? (totalAchievementAmount / totalMonthlyTarget) * 100 : 0;
//         const unachievementAmountPercent = 100 - achievementAmountPercent;

//         const stockAchievementPercent =
//           totalStockTarget > 0 ? (totalStockAchievement / totalStockTarget) * 100 : 0;
//         const stockUnachievementPercent = 100 - stockAchievementPercent;

//         const pendingStockTarget = totalStockTarget - totalStockAchievement;

//         monthlyDetails.push({
//           month: startOfMonth.toLocaleString('default', { month: 'long' }),
//           year: startOfMonth.getFullYear(),
//           totalMonthlyTarget,
//           totalAchievementAmount,
//           pendingAmount: totalMonthlyTarget - totalAchievementAmount,
//           achievementAmountPercent: achievementAmountPercent.toFixed(2),
//           unachievementAmountPercent: unachievementAmountPercent.toFixed(2),
//           totalStockTarget,
//           totalStockAchievement,
//           pendingStockTarget: pendingStockTarget,
//           stockAchievementPercent: stockAchievementPercent.toFixed(2),
//           stockUnachievementPercent: stockUnachievementPercent.toFixed(2),
//           roleName: role,
//           roleId: user.role_id,
//         });

//         targetDate.setMonth(targetDate.getMonth() + 1);
//       }

//       result.push({
//         user_id: user.id,
//         full_name: user.full_name,
//         image: photo,
//         monthlyDetails,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.error('Error fetching lower hierarchy sales details:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch sales details',
//       error: error.message,
//     });
//   }
// };