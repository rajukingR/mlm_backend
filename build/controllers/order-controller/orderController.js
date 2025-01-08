"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
  OrderItem = _require.OrderItem,
  Product = _require.Product,
  User = _require.User,
  OrderLimit = _require.OrderLimit;
var _require2 = require('../../../models'),
  Notification = _require2.Notification;
exports.createOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, user_id, items, coupon_code, isCurrentDateWithinRange, user, userRole, totalAmount, totalQuantity, orderItems, productIds, products, productMap, rolePriceColumn, _iterator, _step, item, product, basePrice, itemTotalPrice, finalAmount, higherRoleId, orderId, order, notificationMessage;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, user_id = _req$body.user_id, items = _req$body.items, coupon_code = _req$body.coupon_code;
          _context.prev = 1;
          // Helper function for date range check
          isCurrentDateWithinRange = function isCurrentDateWithinRange(fromDate, toDate) {
            var currentDate = new Date();
            var startDate = new Date(fromDate);
            var endDate = new Date(toDate);
            return currentDate >= startDate && currentDate <= endDate;
          }; // Calculate total amount, total order volume (in liters), and prepare order items
          _context.next = 5;
          return User.findByPk(user_id, {
            attributes: ['id', 'username', 'full_name', 'role_name']
          });
        case 5:
          user = _context.sent;
          if (user) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 8:
          if (!(!Array.isArray(items) || items.length === 0)) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Items must be a non-empty array'
          }));
        case 10:
          // Determine user role
          userRole = user.role_name; // Initialize total amount, total order volume (in liters), and an array for order items
          totalAmount = 0;
          totalQuantity = 0;
          orderItems = []; // Retrieve products in bulk
          productIds = items.map(function (item) {
            return item.product_id;
          });
          _context.next = 17;
          return Product.findAll({
            where: {
              id: productIds
            }
          });
        case 17:
          products = _context.sent;
          productMap = new Map(products.map(function (product) {
            return [product.id, product];
          })); // Role-based pricing logic
          rolePriceColumn = {
            'Area Development Officer': function Area_Development_Officer(product) {
              if (product.autoUpdate && product.fromDate && product.toDate && isCurrentDateWithinRange(product.fromDate, product.toDate)) {
                return product.ADO_price;
              }
              return product.adoPrice;
            },
            'Master Distributor': function Master_Distributor(product) {
              if (product.autoUpdate && product.fromDate && product.toDate && isCurrentDateWithinRange(product.fromDate, product.toDate)) {
                return product.MD_price;
              }
              return product.mdPrice;
            },
            'Super Distributor': function Super_Distributor(product) {
              if (product.autoUpdate && product.fromDate && product.toDate && isCurrentDateWithinRange(product.fromDate, product.toDate)) {
                return product.SD_price;
              }
              return product.sdPrice;
            },
            'Distributor': function Distributor(product) {
              if (product.autoUpdate && product.fromDate && product.toDate && isCurrentDateWithinRange(product.fromDate, product.toDate)) {
                return product.distributor_price;
              }
              return product.distributorPrice;
            },
            'Customer': function Customer(product) {
              if (product.autoUpdate && product.fromDate && product.toDate && isCurrentDateWithinRange(product.fromDate, product.toDate)) {
                return product.customer_price;
              }
              return product.price;
            }
          };
          _iterator = _createForOfIteratorHelper(items);
          _context.prev = 21;
          _iterator.s();
        case 23:
          if ((_step = _iterator.n()).done) {
            _context.next = 39;
            break;
          }
          item = _step.value;
          product = productMap.get(item.product_id);
          if (product) {
            _context.next = 28;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: "Product with ID ".concat(item.product_id, " not found")
          }));
        case 28:
          if (rolePriceColumn[userRole]) {
            _context.next = 30;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Role ".concat(userRole, " pricing configuration is missing")
          }));
        case 30:
          basePrice = rolePriceColumn[userRole](product);
          if (!(basePrice === null || basePrice === undefined)) {
            _context.next = 33;
            break;
          }
          return _context.abrupt("return", res.status(500).json({
            message: "Pricing not configured for product ID ".concat(item.product_id)
          }));
        case 33:
          itemTotalPrice = basePrice * item.quantity;
          totalAmount += itemTotalPrice;
          totalQuantity += item.quantity;
          orderItems.push({
            product_id: product.id,
            quantity: item.quantity,
            quantity_type: product.quantity_type,
            baseprice: basePrice,
            final_price: itemTotalPrice,
            item_volume: parseFloat(product.productVolume) * item.quantity
          });
        case 37:
          _context.next = 23;
          break;
        case 39:
          _context.next = 44;
          break;
        case 41:
          _context.prev = 41;
          _context.t0 = _context["catch"](21);
          _iterator.e(_context.t0);
        case 44:
          _context.prev = 44;
          _iterator.f();
          return _context.finish(44);
        case 47:
          finalAmount = totalAmount; // Logic to set higher_role_id statically if the role is "Area Development Officer"
          higherRoleId = null;
          if (!(userRole === 'Area Development Officer')) {
            _context.next = 53;
            break;
          }
          higherRoleId = 1; // Static value for higher_role_id
          _context.next = 56;
          break;
        case 53:
          _context.next = 55;
          return getSuperior(user.id);
        case 55:
          higherRoleId = _context.sent;
        case 56:
          orderId = Math.floor(10000000 + Math.random() * 90000000); // Generates an 8-digit number
        case 57:
          _context.next = 59;
          return Order.findOne({
            where: {
              order_id: orderId
            }
          });
        case 59:
          if (_context.sent) {
            _context.next = 56;
            break;
          }
        case 60:
          _context.next = 62;
          return Order.create({
            order_id: orderId,
            // Use the generated 8-digit order ID
            user_id: user_id,
            total_amount: totalAmount,
            coupon_code: coupon_code || null,
            discount_applied: null,
            final_amount: finalAmount,
            status: 'Pending',
            requested_by_role: userRole,
            higher_role_id: higherRoleId,
            total_order_quantity: totalQuantity
          });
        case 62:
          order = _context.sent;
          _context.next = 65;
          return OrderItem.bulkCreate(orderItems.map(function (item) {
            return _objectSpread(_objectSpread({}, item), {}, {
              order_id: order.id
            });
          }));
        case 65:
          // Add a notification entry
          notificationMessage = "New order requested by User ".concat(user.full_name);
          _context.prev = 66;
          _context.next = 69;
          return Notification.create({
            user_id: higherRoleId,
            message: notificationMessage,
            photo: "1733391557532.jpeg",
            detail: {
              user_name: user.full_name,
              final_amount: finalAmount,
              type: 'order_request',
              status: 'Pending',
              role: userRole,
              order_id: order.id
            }
          });
        case 69:
          _context.next = 74;
          break;
        case 71:
          _context.prev = 71;
          _context.t1 = _context["catch"](66);
          console.error('Error creating notification:', _context.t1);
        case 74:
          return _context.abrupt("return", res.status(201).json({
            message: 'Order created successfully',
            order: order
          }));
        case 77:
          _context.prev = 77;
          _context.t2 = _context["catch"](1);
          console.error(_context.t2);
          return _context.abrupt("return", res.status(500).json({
            message: 'Internal server error',
            error: _context.t2.message
          }));
        case 81:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 77], [21, 41, 44, 47], [66, 71]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Implement this function to find the superior based on role
// const getSuperior = async (userId, userRole) => {
//   // Find the user to get the superior IDs
//   const user = await User.findByPk(userId);
//   if (!user) {
//     return null; // User not found, return null
//   }

//   switch (userRole) {
//     case 'Customer': // Assuming Customers are under Distributors
//       return user.superior_d || await getSuperior(user.superior_d, 'Distributor');
//     case 'Distributor':
//       return user.superior_sd || await getSuperior(user.superior_sd, 'Super Distributor');
//     case 'Super Distributor':
//       return user.superior_md || await getSuperior(user.superior_md, 'Master Distributor');
//     case 'Master Distributor':
//       return user.superior_ado || await getSuperior(user.superior_ado, 'Area Development Officer');
//     case 'Area Development Officer':
//       return user.superior_id; // Assuming this is the Admin or the direct superior
//     default:
//       return null; // No higher role found
//   }
// };
var getSuperior = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(userId) {
    var user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return User.findByPk(userId);
        case 2:
          user = _context2.sent;
          if (user) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", null);
        case 5:
          return _context2.abrupt("return", user.superior_id);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getSuperior(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/////////////********** / Get Orders my**********//////////

exports.getOrdersByUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var user_id, orders;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          user_id = req.params.user_id; // Expecting user_id as a URL parameter
          _context3.prev = 1;
          _context3.next = 4;
          return Order.findAll({
            where: {
              user_id: user_id
            },
            order: [['createdAt', 'DESC']],
            // Replace 'createdAt' with the column name you want to sort by
            include: [{
              model: OrderItem,
              as: 'OrderItems',
              // Make sure this matches the alias used in the Order model
              required: false,
              include: [{
                model: Product,
                as: 'product'
              }]
            }]
          });
        case 4:
          orders = _context3.sent;
          if (!(orders.length === 0)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'No orders found for this user'
          }));
        case 7:
          return _context3.abrupt("return", res.status(200).json({
            orders: orders
          }));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: 'Internal server error',
            error: _context3.t0.message
          }));
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

/////////////see other member requested orderlist////////////
//////////////////////////////////////////////////////

var updateAssignedOrders = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var pendingOrders, _iterator2, _step2, order, user, orderUser, orderUserName, userRoleID, userRoleName, superiorId, roleTimeLimit, timeLimit;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Order.findAll({
            where: {
              status: 'Pending'
            }
          });
        case 3:
          pendingOrders = _context4.sent;
          // Loop through each pending order
          _iterator2 = _createForOfIteratorHelper(pendingOrders);
          _context4.prev = 5;
          _iterator2.s();
        case 7:
          if ((_step2 = _iterator2.n()).done) {
            _context4.next = 67;
            break;
          }
          order = _step2.value;
          _context4.next = 11;
          return User.findOne({
            where: {
              id: order.higher_role_id
            }
          });
        case 11:
          user = _context4.sent;
          _context4.next = 14;
          return User.findOne({
            where: {
              id: order.user_id
            }
          });
        case 14:
          orderUser = _context4.sent;
          orderUserName = orderUser ? orderUser.full_name : 'Unknown User';
          if (!user) {
            _context4.next = 64;
            break;
          }
          // Declare userRoleID here to ensure it's in scope for all conditions
          userRoleID = user.role_id;
          userRoleName = orderUser.role_name;
          superiorId = user.superior_id; // Fetch the time limit based on the user's role from the order_limits table
          _context4.next = 22;
          return OrderLimit.findOne({
            where: {
              role: user.role_name
            }
          });
        case 22:
          roleTimeLimit = _context4.sent;
          if (!roleTimeLimit) {
            _context4.next = 59;
            break;
          }
          // Calculate the time limit based on the role's time_limit_hours
          timeLimit = new Date(Date.now() - roleTimeLimit.hours * 60 * 60 * 1000); // const timeLimit = new Date(Date.now() - 10 * 1000);
          // Check if the order's updatedAt is older than the calculated time limit
          if (!(new Date(order.updatedAt) <= timeLimit)) {
            _context4.next = 56;
            break;
          }
          if (!(userRoleName === "Admin")) {
            _context4.next = 32;
            break;
          }
          _context4.next = 29;
          return Order.update({
            higher_role_id: userRoleID
          },
          // Set higher_role_id to userRoleID
          {
            where: {
              id: order.id
            }
          });
        case 29:
          console.log("Order no ".concat(order.id, " was assigned to Admin role ID ").concat(userRoleID, "."));
          _context4.next = 53;
          break;
        case 32:
          if (!superiorId) {
            _context4.next = 42;
            break;
          }
          _context4.next = 35;
          return Notification.create({
            user_id: order.higher_role_id,
            // Current user's ID
            message: "You didn't accept the order, so it is being reassigned to the next top hierarchy.",
            photo: "1733391557532.jpeg",
            // You can update this if you have a different photo for the user
            detail: {
              user_name: orderUserName,
              order_id: order.id,
              role: userRoleName,
              status: 'Pending',
              type: 'order_request'
            }
          });
        case 35:
          _context4.next = 37;
          return Order.update({
            higher_role_id: superiorId
          }, {
            where: {
              id: order.id
            }
          });
        case 37:
          console.log("Order no ".concat(order.id, " was assigned to superior ID ").concat(superiorId, "."));
          _context4.next = 40;
          return Notification.create({
            // user_id: superiorId,
            user_id: user.role_name === "Area Development Officer" ? 1 : superiorId,
            message: "".concat(user.full_name, " did not accept the order, so it has been reassigned to you."),
            photo: "1733391557532.jpeg",
            detail: {
              user_name: orderUserName,
              order_id: order.id,
              role: userRoleName,
              status: 'Pending',
              type: 'order_request'
            }
          });
        case 40:
          _context4.next = 53;
          break;
        case 42:
          if (!userRoleID) {
            _context4.next = 52;
            break;
          }
          _context4.next = 45;
          return Notification.create({
            user_id: order.higher_role_id,
            // Current user's ID
            message: "You didn't accept the order, so it is being reassigned to the next hierarchy.",
            photo: "1733391557532.jpeg",
            detail: {
              user_name: orderUserName,
              order_id: order.id,
              role: userRoleName,
              status: 'Pending',
              type: 'order_request'
            }
          });
        case 45:
          _context4.next = 47;
          return Order.update({
            higher_role_id: userRoleID
          }, {
            where: {
              id: order.id
            }
          });
        case 47:
          console.log("Order no ".concat(order.id, " was assigned to role ID ").concat(userRoleID, "."));
          _context4.next = 50;
          return Notification.create({
            // user_id: userRoleID,
            user_id: user.role_name === "Area Development Officer" ? 1 : userRoleID,
            message: "".concat(user.full_name, " did not accept the order, so it has been reassigned to you."),
            photo: "1733391557532.jpeg",
            detail: {
              user_name: orderUserName,
              order_id: order.id,
              role: userRoleName,
              status: 'Pending',
              type: 'order_request'
            }
          });
        case 50:
          _context4.next = 53;
          break;
        case 52:
          console.log("No valid superior or user role ID found for order ".concat(order.id));
        case 53:
          // If the requested role is "Area Development Officer" and no superiorId, mark as Cancelled
          if (order.requested_by_role === "Area Development Officer" && !superiorId) {
            console.log("Order no ".concat(order.id, " status already updated to Cancelled."));
          }
          _context4.next = 57;
          break;
        case 56:
          console.log("Order no ".concat(order.id, " was created recently, skipping update."));
        case 57:
          _context4.next = 62;
          break;
        case 59:
          _context4.next = 61;
          return Order.update({
            higher_role_id: userRoleID
          },
          // Set higher_role_id to userRoleID
          {
            where: {
              id: order.id
            }
          });
        case 61:
          console.log("No time limit found for the role ".concat(user.role_name, " in order ").concat(order.id, "."));
        case 62:
          _context4.next = 65;
          break;
        case 64:
          console.log("No user found with ID ".concat(order.higher_role_id, "."));
        case 65:
          _context4.next = 7;
          break;
        case 67:
          _context4.next = 72;
          break;
        case 69:
          _context4.prev = 69;
          _context4.t0 = _context4["catch"](5);
          _iterator2.e(_context4.t0);
        case 72:
          _context4.prev = 72;
          _iterator2.f();
          return _context4.finish(72);
        case 75:
          _context4.next = 80;
          break;
        case 77:
          _context4.prev = 77;
          _context4.t1 = _context4["catch"](0);
          console.error('Error updating orders:', _context4.t1.message);
        case 80:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 77], [5, 69, 72, 75]]);
  }));
  return function updateAssignedOrders() {
    return _ref4.apply(this, arguments);
  };
}();

// Set an interval to call the function every 30 seconds
setInterval(updateAssignedOrders, 60 * 60 * 1000);
// setInterval(updateAssignedOrders, 30 * 1000);
// updateAssignedOrders(); 

// Function to fetch orders requested by lower hierarchy roles
exports.getOrdersBySubordinates = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userId, currentUser, currentRole, subordinates, subordinateIds, orders, orderDetails;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.params.user_id; // The ID of the currently logged-in user
          _context5.prev = 1;
          _context5.next = 4;
          return User.findByPk(userId);
        case 4:
          currentUser = _context5.sent;
          if (currentUser) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          currentRole = currentUser.role_name; // Fetch all subordinate users based on the current user's role
          _context5.next = 10;
          return findSubordinateUsers(userId, currentRole);
        case 10:
          subordinates = _context5.sent;
          if (!(subordinates.length === 0)) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'No subordinates found'
          }));
        case 13:
          // Fetch orders requested by subordinates, including customer name, image, mobile number, and order details
          subordinateIds = subordinates.map(function (user) {
            return user.id;
          }); // Extract subordinate user IDs
          _context5.next = 16;
          return Order.findAll({
            where: {
              higher_role_id: userId
            },
            include: [{
              model: User,
              as: 'customer',
              // Alias for the User model representing the customer
              attributes: ['full_name', 'image', 'mobile_number'] // Fetch customer name, image, and mobile number
            }, {
              model: OrderItem,
              as: 'OrderItems',
              include: [{
                model: Product,
                as: 'product',
                // Including product details if needed
                attributes: ['name', 'image', 'price', 'description'] // Fetch product details
              }] // Include order items if they exist
            }],
            attributes: ['id', 'order_id', 'total_amount', 'coupon_code', 'discount_applied', 'final_amount', 'total_order_quantity', 'status', 'createdAt', 'updatedAt']
          });
        case 16:
          orders = _context5.sent;
          if (!(orders.length === 0)) {
            _context5.next = 19;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'No orders found for subordinates'
          }));
        case 19:
          // Format the response to include necessary details
          orderDetails = orders.map(function (order) {
            return {
              orderId: order.id,
              orderUniqueId: order.order_id,
              userId: order.user_id,
              totalAmount: order.total_amount,
              couponCode: order.coupon_code,
              discountApplied: order.discount_applied,
              finalAmount: order.final_amount,
              totalOrderQuantity: order.total_order_quantity,
              status: order.status,
              requestedByRole: order.requested_by_role,
              higherRoleId: order.higher_role_id,
              createdAt: order.createdAt,
              updatedAt: order.updatedAt,
              customerName: order.customer.full_name,
              // Customer name
              customerImage: order.customer.image,
              // Customer image
              customerMobile: order.customer.mobile_number,
              // Customer mobile number
              OrderItems: order.OrderItems.map(function (item) {
                return {
                  itemId: item.id,
                  productId: item.product_id,
                  quantity: item.quantity,
                  quantityType: item.quantity_type,
                  basePrice: item.baseprice,
                  finalPrice: item.final_price,
                  itemVolume: item.item_volume,
                  productName: item.product.name,
                  // Product name
                  productImage: item.product.image,
                  // Product image
                  productPrice: item.product.price,
                  // Product price
                  productDescription: item.product.description // Product description
                };
              })
            };
          });
          return _context5.abrupt("return", res.status(200).json({
            orders: orderDetails
          }));
        case 23:
          _context5.prev = 23;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: 'Internal server error',
            error: _context5.t0.message
          }));
        case 27:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 23]]);
  }));
  return function (_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

// Helper function to find subordinates based on the user's role
// const findSubordinateUsers = async (userId, role) => {
//   let whereCondition = {};

//   switch (role) {
//     case 'Area Development Officer':
//       whereCondition = { superior_ado: userId };
//       break;
//     case 'Master Distributor':
//       whereCondition = { superior_md: userId };
//       break;
//     case 'Super Distributor':
//       whereCondition = { superior_sd: userId };
//       break;
//     case 'Distributor':
//       whereCondition = { superior_d: userId };
//       break;
//     default:
//       return []; // No subordinates for roles like Customer
//   }

//   return await User.findAll({
//     where: whereCondition
//   });
// };
// Helper function to find subordinates based on the user's role
var findSubordinateUsers = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(userId) {
    var user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return User.findByPk(userId);
        case 2:
          user = _context6.sent;
          if (user) {
            _context6.next = 5;
            break;
          }
          return _context6.abrupt("return", []);
        case 5:
          _context6.next = 7;
          return User.findAll({
            where: {
              superior_id: userId
            } // Fetch users whose superior_id is the logged-in user
          });
        case 7:
          return _context6.abrupt("return", _context6.sent);
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function findSubordinateUsers(_x8) {
    return _ref6.apply(this, arguments);
  };
}();

///////////*********get order detail**********/////////////// */

// Get Order Details
exports.getOrderDetails = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var orderId, orderDetails;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          orderId = req.params.id; // Assuming the order ID is passed in the request params
          _context7.next = 4;
          return Order.findOne({
            where: {
              id: orderId
            },
            include: [{
              model: OrderItem,
              as: 'OrderItems',
              // Correct alias here
              include: [{
                model: Product,
                as: 'product' // Make sure this alias matches your Product model association
              }]
            }]
          });
        case 4:
          orderDetails = _context7.sent;
          if (orderDetails) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));
        case 7:
          res.json(orderDetails);
          _context7.next = 14;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context7.t0.message
          });
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function (_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

//////////////Cncel Order ////////////////////
//////////////////////////////////////////////

exports.cancelOrder = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var orderId, userId, order;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          orderId = req.params.orderId; // Extract orderId from the URL parameters
          userId = req.user.id; // Assuming you get the user ID from the decoded token
          _context8.prev = 2;
          _context8.next = 5;
          return Order.findOne({
            where: {
              id: orderId
            }
          });
        case 5:
          order = _context8.sent;
          if (order) {
            _context8.next = 8;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));
        case 8:
          if (!(order.user_id !== userId)) {
            _context8.next = 10;
            break;
          }
          return _context8.abrupt("return", res.status(403).json({
            message: 'You are not authorized to cancel this order'
          }));
        case 10:
          // Update the order status to 'Cancelled'
          order.status = 'Cancelled';
          _context8.next = 13;
          return order.save();
        case 13:
          return _context8.abrupt("return", res.status(200).json({
            message: 'Order cancelled successfully',
            order: order
          }));
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](2);
          return _context8.abrupt("return", res.status(500).json({
            message: 'Internal server error',
            error: _context8.t0.message
          }));
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[2, 16]]);
  }));
  return function (_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

/////////Accept Ordr by hiery hirarchy////////////////
//////////////Accepted means sended //////////////////////////
// In your orderController.js
exports.acceptOrder = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var orderId, userId, order, orderCreator, higherRoleUser, notificationMessage, gallery, notificationDetails;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          orderId = req.params.orderId;
          userId = req.user.id; // Extract 'id' from req.user (the logged-in user's ID)
          _context9.prev = 2;
          // Log the orderId and userId for debugging
          console.log("Accepting Order - Order ID:", orderId, "User ID:", userId);
          if (userId) {
            _context9.next = 6;
            break;
          }
          return _context9.abrupt("return", res.status(401).json({
            message: "Unauthorized. No user ID found."
          }));
        case 6:
          _context9.next = 8;
          return Order.findOne({
            where: {
              id: orderId,
              higher_role_id: userId
            }
          });
        case 8:
          order = _context9.sent;
          if (order) {
            _context9.next = 11;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: "Order not found or you are not authorized to accept this order."
          }));
        case 11:
          _context9.next = 13;
          return User.findByPk(order.user_id, {
            attributes: ['username', 'full_name']
          });
        case 13:
          orderCreator = _context9.sent;
          if (orderCreator) {
            _context9.next = 16;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: "Order creator not found."
          }));
        case 16:
          _context9.next = 18;
          return User.findByPk(userId, {
            attributes: ['username', 'full_name']
          });
        case 18:
          higherRoleUser = _context9.sent;
          if (higherRoleUser) {
            _context9.next = 21;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: "Higher role user not found."
          }));
        case 21:
          // Update order status to 'Accepted'
          order.status = 'Accepted';
          _context9.next = 24;
          return order.save();
        case 24:
          //****** Notification Logic ******//
          notificationMessage = "Order ID: ".concat(orderId, " has been accepted by ").concat(higherRoleUser.full_name);
          gallery = "1733391571619.jpeg"; // Image filename for accepted orders
          notificationDetails = {
            user_name: orderCreator.full_name,
            accepted_by: higherRoleUser.full_name,
            total_amount: order.total_amount,
            type: 'order_accept'
          }; // Debugging the gallery value
          console.log("Gallery value being inserted:", gallery);

          // Create the notification
          _context9.next = 30;
          return Notification.create({
            user_id: order.user_id,
            message: notificationMessage,
            photo: gallery,
            // Ensure the gallery value is passed
            is_read: false,
            created_at: new Date(),
            detail: notificationDetails
          }).then(function () {
            console.log("Notification created successfully with photo:", gallery);
          })["catch"](function (err) {
            console.error("Error inserting notification photo:", err);
          });
        case 30:
          // Response for successful order acceptance
          res.status(200).json({
            message: "Order accepted successfully.",
            order: order
          });
          _context9.next = 37;
          break;
        case 33:
          _context9.prev = 33;
          _context9.t0 = _context9["catch"](2);
          console.error("Error while accepting order:", _context9.t0);
          res.status(500).json({
            message: "Internal server error",
            error: _context9.t0
          });
        case 37:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[2, 33]]);
  }));
  return function (_x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}();

///ADMIN GET PENDING ORDERS

exports.getOrdersBySubordinatesAdmin = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var orders, orderDetails;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return Order.findAll({
            where: {
              higher_role_id: 1,
              // Filter only higher_role_id = 1
              status: ['Pending', 'Accepted', 'Cancelled'] // Filter required statuses
            },
            include: [{
              model: User,
              as: 'customer',
              attributes: ['full_name', 'image', 'mobile_number'] // Only fetch necessary fields
            }, {
              model: OrderItem,
              as: 'OrderItems',
              attributes: ['id', 'product_id', 'quantity', 'quantity_type', 'baseprice', 'final_price', 'item_volume'],
              include: [{
                model: Product,
                as: 'product',
                attributes: ['name', 'image', 'price', 'description'] // Fetch product details
              }]
            }],
            attributes: ['id', 'order_id', 'total_amount', 'coupon_code', 'discount_applied', 'final_amount', 'total_order_quantity', 'status', 'createdAt', 'updatedAt'] // Added 'order_id' here
          });
        case 3:
          orders = _context10.sent;
          if (!(!orders || orders.length === 0)) {
            _context10.next = 6;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: 'No orders found'
          }));
        case 6:
          // Map orders to the desired structure
          orderDetails = orders.map(function (order) {
            return {
              orderId: order.id,
              orderUniqueId: order.order_id,
              // Accessing order_id
              totalAmount: order.total_amount,
              couponCode: order.coupon_code,
              discountApplied: order.discount_applied,
              finalAmount: order.final_amount,
              totalOrderQuantity: order.total_order_quantity,
              status: order.status,
              createdAt: order.createdAt,
              updatedAt: order.updatedAt,
              customer: order.customer ? {
                name: order.customer.full_name,
                image: order.customer.image,
                mobile: order.customer.mobile_number
              } : null,
              OrderItems: order.OrderItems.map(function (item) {
                return {
                  itemId: item.id,
                  productId: item.product_id,
                  quantity: item.quantity,
                  quantityType: item.quantity_type,
                  basePrice: item.baseprice,
                  finalPrice: item.final_price,
                  itemVolume: item.item_volume,
                  product: item.product ? {
                    name: item.product.name,
                    image: item.product.image,
                    price: item.product.price,
                    description: item.product.description
                  } : null
                };
              })
            };
          }); // Immediately respond with the processed data
          return _context10.abrupt("return", res.status(200).json({
            orders: orderDetails
          }));
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          console.error('Error fetching orders:', _context10.t0);
          return _context10.abrupt("return", res.status(500).json({
            message: 'Internal server error',
            error: _context10.t0.message
          }));
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return function (_x15, _x16) {
    return _ref10.apply(this, arguments);
  };
}();
exports.acceptOrRejectOrder = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var orderId, action, userId, userRole, order, user, userName, orderItems, _iterator3, _step3, _loop, _ret;
    return _regeneratorRuntime().wrap(function _callee11$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          orderId = req.params.orderId; // Get orderId from URL parameters
          action = req.body.action;
          userId = req.user.id;
          userRole = req.user.role_name;
          _context12.prev = 4;
          _context12.next = 7;
          return Order.findByPk(orderId);
        case 7:
          order = _context12.sent;
          _context12.next = 10;
          return User.findByPk(userId, {
            attributes: ['full_name']
          });
        case 10:
          user = _context12.sent;
          if (user) {
            _context12.next = 13;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 13:
          userName = user.full_name;
          if (order) {
            _context12.next = 16;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));
        case 16:
          if (!(order.status === 'Accepted' || order.status === 'Cancelled')) {
            _context12.next = 18;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            message: 'Order already processed'
          }));
        case 18:
          if (!(action !== 'accept' && action !== 'reject')) {
            _context12.next = 20;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            message: 'Invalid action'
          }));
        case 20:
          _context12.next = 22;
          return OrderItem.findAll({
            where: {
              order_id: orderId
            },
            attributes: ['product_id', 'quantity']
          });
        case 22:
          orderItems = _context12.sent;
          if (!(!orderItems || orderItems.length === 0)) {
            _context12.next = 25;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: 'No items found for this order'
          }));
        case 25:
          if (!(action === 'accept')) {
            _context12.next = 52;
            break;
          }
          _iterator3 = _createForOfIteratorHelper(orderItems);
          _context12.prev = 27;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var item, productId, requestedQuantity, _product, updatedStockQuantity, receivedOrders, soldOrders, stockQuantity, product;
            return _regeneratorRuntime().wrap(function _loop$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  item = _step3.value;
                  productId = item.product_id;
                  requestedQuantity = item.quantity;
                  if (!(userRole === 'Admin')) {
                    _context11.next = 16;
                    break;
                  }
                  _context11.next = 6;
                  return Product.findByPk(productId, {
                    attributes: ['id', 'name', 'stock_quantity']
                  });
                case 6:
                  _product = _context11.sent;
                  if (_product) {
                    _context11.next = 9;
                    break;
                  }
                  return _context11.abrupt("return", {
                    v: res.status(400).json({
                      message: "Product with ID ".concat(productId, " not found.")
                    })
                  });
                case 9:
                  if (!(requestedQuantity > _product.stock_quantity)) {
                    _context11.next = 11;
                    break;
                  }
                  return _context11.abrupt("return", {
                    v: res.status(400).json({
                      message: "Insufficient stock for product \"".concat(_product.name, "\". Available: ").concat(_product.stock_quantity, ", Requested: ").concat(requestedQuantity)
                    })
                  });
                case 11:
                  updatedStockQuantity = _product.stock_quantity - requestedQuantity;
                  _product.stock_quantity = updatedStockQuantity;
                  _context11.next = 15;
                  return _product.save();
                case 15:
                  return _context11.abrupt("return", 0);
                case 16:
                  _context11.next = 18;
                  return OrderItem.findAll({
                    where: {
                      '$order.status$': 'Accepted',
                      '$order.user_id$': userId,
                      product_id: productId
                    },
                    attributes: ['quantity'],
                    include: [{
                      model: Order,
                      as: 'order',
                      where: {
                        status: 'Accepted',
                        user_id: userId
                      },
                      attributes: []
                    }]
                  });
                case 18:
                  receivedOrders = _context11.sent;
                  _context11.next = 21;
                  return OrderItem.findAll({
                    where: {
                      '$order.status$': 'Accepted',
                      '$order.higher_role_id$': userId,
                      product_id: productId
                    },
                    attributes: ['quantity'],
                    include: [{
                      model: Order,
                      as: 'order',
                      where: {
                        status: 'Accepted',
                        higher_role_id: userId
                      },
                      attributes: []
                    }]
                  });
                case 21:
                  soldOrders = _context11.sent;
                  // Calculate stockQuantity
                  stockQuantity = 0;
                  receivedOrders.forEach(function (received) {
                    stockQuantity += parseFloat(received.quantity || 0);
                  });
                  soldOrders.forEach(function (sold) {
                    stockQuantity -= parseFloat(sold.quantity || 0);
                  });

                  // Fetch product name for non-admin users
                  _context11.next = 27;
                  return Product.findByPk(productId, {
                    attributes: ['name']
                  });
                case 27:
                  product = _context11.sent;
                  if (product) {
                    _context11.next = 30;
                    break;
                  }
                  return _context11.abrupt("return", {
                    v: res.status(400).json({
                      message: "Product with ID ".concat(productId, " not found.")
                    })
                  });
                case 30:
                  if (!(requestedQuantity > stockQuantity)) {
                    _context11.next = 32;
                    break;
                  }
                  return _context11.abrupt("return", {
                    v: res.status(400).json({
                      message: "Insufficient stock for product \"".concat(product.name, "\". Available: ").concat(stockQuantity, ", Requested: ").concat(requestedQuantity)
                    })
                  });
                case 32:
                case "end":
                  return _context11.stop();
              }
            }, _loop);
          });
          _iterator3.s();
        case 30:
          if ((_step3 = _iterator3.n()).done) {
            _context12.next = 39;
            break;
          }
          return _context12.delegateYield(_loop(), "t0", 32);
        case 32:
          _ret = _context12.t0;
          if (!(_ret === 0)) {
            _context12.next = 35;
            break;
          }
          return _context12.abrupt("continue", 37);
        case 35:
          if (!_ret) {
            _context12.next = 37;
            break;
          }
          return _context12.abrupt("return", _ret.v);
        case 37:
          _context12.next = 30;
          break;
        case 39:
          _context12.next = 44;
          break;
        case 41:
          _context12.prev = 41;
          _context12.t1 = _context12["catch"](27);
          _iterator3.e(_context12.t1);
        case 44:
          _context12.prev = 44;
          _iterator3.f();
          return _context12.finish(44);
        case 47:
          // If all items have sufficient stock, update the order status to 'Accepted'
          order.status = 'Accepted';
          //
          _context12.next = 50;
          return Notification.create({
            user_id: order.user_id,
            message: "Order has been accepted by ".concat(userName, "."),
            photo: "1733391571619.jpeg",
            detail: {
              order_id: order.id,
              status: 'Accepted',
              user_name: userName,
              role: userRole,
              type: "order_acceptReject"
            }
          });
        case 50:
          _context12.next = 56;
          break;
        case 52:
          if (!(action === 'reject')) {
            _context12.next = 56;
            break;
          }
          // Update the order status to 'Cancelled'
          order.status = 'Cancelled';
          //
          _context12.next = 56;
          return Notification.create({
            user_id: order.user_id,
            message: "Order has been rejected by ".concat(userName, "."),
            photo: "1733391593433.jpeg",
            detail: {
              order_id: order.id,
              status: 'Rejected',
              user_name: userName,
              role: userRole,
              type: "order_acceptReject"
            }
          });
        case 56:
          _context12.next = 58;
          return order.save();
        case 58:
          return _context12.abrupt("return", res.json({
            message: "Order ".concat(action, "ed successfully")
          }));
        case 61:
          _context12.prev = 61;
          _context12.t2 = _context12["catch"](4);
          console.error('Error processing order:', _context12.t2); // Log the full error
          return _context12.abrupt("return", res.status(500).json({
            message: 'Server error',
            error: _context12.t2.message
          }));
        case 65:
        case "end":
          return _context12.stop();
      }
    }, _callee11, null, [[4, 61], [27, 41, 44, 47]]);
  }));
  return function (_x17, _x18) {
    return _ref11.apply(this, arguments);
  };
}();

// exports.acceptOrRejectOrder = async (req, res) => {
//   const { orderId } = req.params; // Get orderId from URL parameters
//   const { action, productId, quantity } = req.body; 
//   const userId = req.user.id; // Logged-in user's ID

//   try {
//     // Find the order by its ID
//     const order = await Order.findByPk(orderId);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Ensure the order is in a valid state to accept/reject
//     if (order.status === 'Accepted' || order.status === 'Cancelled') {
//       return res.status(400).json({ message: 'Order already processed' });
//     }

//     // Check if the action is valid
//     if (action !== 'accept' && action !== 'reject') {
//       return res.status(400).json({ message: 'Invalid action' });
//     }

//     if (action === 'accept') {
//       // Calculate stockQuantity dynamically
//       const receivedOrders = await OrderItem.findAll({
//         where: {
//           '$order.status$': 'Accepted',
//           '$order.user_id$': userId,
//           product_id: productId,
//         },
//         attributes: ['product_id', 'quantity'],
//         include: [{
//           model: Order,
//           as: 'order',
//           where: { status: 'Accepted', user_id: userId },
//           attributes: [],
//         }],
//       });

//       const soldOrders = await OrderItem.findAll({
//         where: {
//           '$order.status$': 'Accepted',
//           '$order.higher_role_id$': userId,
//           product_id: productId,
//         },
//         attributes: ['product_id', 'quantity'],
//         include: [{
//           model: Order,
//           as: 'order',
//           where: { status: 'Accepted', higher_role_id: userId },
//           attributes: [],
//         }],
//       });

//       // Calculate stockQuantity
//       let stockQuantity = 0;
//       receivedOrders.forEach((order) => {
//         stockQuantity += parseFloat(order.quantity || 0);
//       });
//       soldOrders.forEach((order) => {
//         stockQuantity -= parseFloat(order.quantity || 0);
//       });

//       // Check if requested quantity exceeds stockQuantity
//       if (quantity > stockQuantity) {
//         return res.status(400).json({
//           message: `Insufficient stock for product ID ${productId}. Available: ${stockQuantity}, Requested: ${quantity}`,
//         });
//       }

//       // Update the order status to 'Accepted'
//       order.status = 'Accepted';
//     } else if (action === 'reject') {
//       // Update the order status to 'Cancelled'
//       order.status = 'Cancelled';
//     }

//     // Save the updated order status
//     await order.save();

//     return res.json({ message: `Order ${action}ed successfully` });
//   } catch (error) {
//     console.error('Error processing order:', error); // Log the full error
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.acceptOrRejectOrder = async (req, res) => {
//   const { orderId } = req.params; // Get orderId from URL parameters
//   const { action,productId,quantity } = req.body; 
//   const userId = req.user.id;

//   try {
//     // Find the order by its ID
//     const order = await Order.findByPk(orderId);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Ensure the order is in a valid state to accept/reject
//     if (order.status === 'Accepted' || order.status === 'Cancelled') {
//       return res.status(400).json({ message: 'Order already processed' });
//     }

//     // Check if the action is valid
//     if (action !== 'accept' && action !== 'reject') {
//       return res.status(400).json({ message: 'Invalid action' });
//     }

//     // Update the order status based on the action
//     if (action === 'accept') {
//       order.status = 'Accepted';
//     } else if (action === 'reject') {
//       order.status = 'Cancelled';
//     }

//     // Save the updated order status
//     await order.save();

//     return res.json({ message: `Order ${action}ed successfully` });
//   } catch (error) {
//     console.error('Error processing order:', error); // Log the full error
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.getOrdersByUser = async (req, res) => {
//   const { user_id } = req.params; // Expecting user_id as a URL parameter

//   try {
//     // Check if user exists
//     const orders = await Order.findAll({
//       where: { user_id },
//       include: [{
//         model: OrderItem,
//         as: 'OrderItems', // Make sure this matches the alias used in the Order model
//         required: false,
//         include: [
//           {
//             model: Product,
//             as: 'product',
//           },
//         ],
//       }],
//     });

//     if (orders.length === 0) {
//       return res.status(404).json({ message: 'No orders found for this user' });
//     }

//     // Calculate total quantity for each order
//     const ordersWithTotalQuantity = orders.map(order => {
//       // Calculate total order quantity by summing up the quantity of all OrderItems
//       const totalOrderQuantity = order.OrderItems.reduce((total, item) => total + item.quantity, 0);

//       return {
//         ...order.toJSON(), // Convert Sequelize model instance to plain object
//         total_order_quantity: totalOrderQuantity,
//       };
//     });

//     return res.status(200).json({ orders: ordersWithTotalQuantity });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };