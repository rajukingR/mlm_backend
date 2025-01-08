'use strict';

// const { Product } = require('../models');
// const { Product, Order, OrderItem } = require('../models');
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require('../../models'),
  User = _require.User,
  Product = _require.Product,
  OrderItem = _require.OrderItem,
  Order = _require.Order;
var _require2 = require('express-validator'),
  validationResult = _require2.validationResult;
var _require3 = require('express-validator'),
  body = _require3.body;
var _require4 = require('sequelize'),
  Op = _require4.Op; // Correct import for Sequelize operators
var _require5 = require('sequelize'),
  Sequelize = _require5.Sequelize; // Import Sequelize

var productValidationRules = [body('image').optional().custom(function (value) {
  // Allow image file path or a valid URL
  if (value && !(value.startsWith('http://') || value.startsWith('https://') || value.endsWith('.jpg') || value.endsWith('.png'))) {
    throw new Error('Image must be a valid URL or file path');
  }
  return true;
}), body('name').notEmpty().withMessage('Product name is required'), body('product_code').notEmpty().withMessage('Product Id is required'), body('productVolume').notEmpty().withMessage('Product volume must be a decimal number'), body('price').isDecimal().withMessage('MRP price must be a decimal number'), body('adoPrice').isDecimal().withMessage('ADO price must be a decimal number'), body('mdPrice').isDecimal().withMessage('MD price must be a decimal number'), body('sdPrice').isDecimal().withMessage('SD price must be a decimal number'), body('distributorPrice').isDecimal().withMessage('Distributor price must be a decimal number'), body('status').isBoolean().withMessage('Activate status must be a boolean')];

// Utility function to handle errors
var handleErrors = function handleErrors(res, error) {
  var statusCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return res.status(statusCode).json({
    error: error.message || 'An error occurred'
  });
};

// Middleware to validate admin role
var validateAdminRole = function validateAdminRole(req, res, next) {
  console.log('User role:', req.user.role);
  if (req.user.role_name !== 'Admin') {
    return res.status(403).json({
      error: 'Access denied. Admins only.'
    });
  }
  next();
};
exports.createProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var existingProduct, deletedProduct, imageFilename, newProduct;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Product.findOne({
            where: {
              name: req.body.name,
              isDeleted: 0 // Check for active products only
            }
          });
        case 3:
          existingProduct = _context.sent;
          if (!existingProduct) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'Product name already exists and is active'
          }));
        case 6:
          _context.next = 8;
          return Product.findOne({
            where: {
              name: req.body.name,
              isDeleted: 1 // Check for soft-deleted products
            }
          });
        case 8:
          deletedProduct = _context.sent;
          if (!deletedProduct) {
            _context.next = 13;
            break;
          }
          _context.next = 12;
          return deletedProduct.update({
            isDeleted: 0
          });
        case 12:
          return _context.abrupt("return", res.status(200).json({
            message: 'Product reactivated successfully',
            product: deletedProduct
          }));
        case 13:
          // Extract the filename from the uploaded file
          imageFilename = req.file ? req.file.filename : null; // Create the product with the image filename and createdBy field
          _context.next = 16;
          return Product.create(_objectSpread(_objectSpread({}, req.body), {}, {
            image: imageFilename,
            // Save only the image filename
            createdBy: req.user.id,
            // Assuming req.user contains authenticated user data
            isDeleted: 0 // Set the product as active by default
          }));
        case 16:
          newProduct = _context.sent;
          return _context.abrupt("return", res.status(201).json(newProduct));
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            error: _context.t0.message
          }));
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 20]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.updateProduct = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, name, product, deletedProduct, existingProduct, imageFilename, updatedProductData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          name = req.body.name; // Fetch the existing product
          _context2.next = 5;
          return Product.findByPk(id);
        case 5:
          product = _context2.sent;
          if (product) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            error: 'Product not found'
          }));
        case 8:
          _context2.next = 10;
          return Product.findOne({
            where: {
              name: name,
              isDeleted: 1 // Check for soft-deleted products
            }
          });
        case 10:
          deletedProduct = _context2.sent;
          if (!deletedProduct) {
            _context2.next = 15;
            break;
          }
          _context2.next = 14;
          return deletedProduct.update({
            isDeleted: 0
          });
        case 14:
          return _context2.abrupt("return", res.status(200).json({
            message: 'Product reactivated successfully',
            product: deletedProduct
          }));
        case 15:
          _context2.next = 17;
          return Product.findOne({
            where: {
              name: name,
              id: _defineProperty({}, Sequelize.Op.ne, id),
              // Exclude current product by ID
              isDeleted: 0 // Only check for active products
            }
          });
        case 17:
          existingProduct = _context2.sent;
          if (!existingProduct) {
            _context2.next = 20;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: 'Product name already exists and is active.'
          }));
        case 20:
          // Extract the filename from the uploaded file or use the existing image
          imageFilename = req.file ? req.file.filename : product.image; // Update product details, including image if provided
          updatedProductData = _objectSpread(_objectSpread({}, req.body), {}, {
            image: imageFilename // Use new image or keep existing one
          }); // Update the product with the new details
          _context2.next = 24;
          return product.update(updatedProductData);
        case 24:
          return _context2.abrupt("return", res.status(200).json({
            message: 'Product updated successfully',
            product: product
          }));
        case 27:
          _context2.prev = 27;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            error: _context2.t0.message
          }));
        case 30:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 27]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//***** Get all products Admin *****//
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll({
//       where: {
//          isDeleted: false
//          } 
//     });
//     return res.status(200).json(products);
//   } catch (error) {
//     return handleErrors(res, error);
//   }
// };
exports.getAllProducts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$user, userId, roleName, adminUsers, adminIds, products, soldOrders, productStockMap, updatedProducts;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$user = req.user, userId = _req$user.id, roleName = _req$user.role_name; // Check if the logged-in user is Admin
          if (!(roleName !== 'Admin')) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(403).json({
            message: 'Access denied. Only Admins can perform this action.'
          }));
        case 4:
          _context3.next = 6;
          return User.findAll({
            where: {
              role_name: 'Admin',
              status: 'Active'
            },
            attributes: ['id'],
            raw: true
          });
        case 6:
          adminUsers = _context3.sent;
          adminIds = adminUsers.map(function (user) {
            return user.id;
          });
          if (!(adminIds.length === 0)) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'No Admin users found.'
          }));
        case 10:
          _context3.next = 12;
          return Product.findAll({
            where: {
              isDeleted: false
            },
            raw: true
          });
        case 12:
          products = _context3.sent;
          _context3.next = 15;
          return OrderItem.findAll({
            where: {
              '$order.status$': 'Accepted',
              '$order.higher_role_id$': _defineProperty({}, Op["in"], adminIds) // Use Op.in for array filter
            },
            attributes: ['product_id', 'quantity'],
            include: [{
              model: Order,
              as: 'order',
              where: {
                status: 'Accepted',
                higher_role_id: _defineProperty({}, Op["in"], adminIds)
              },
              attributes: []
            }],
            raw: true
          });
        case 15:
          soldOrders = _context3.sent;
          // Calculate stock quantity dynamically
          productStockMap = {}; // Aggregate sold quantities
          soldOrders.forEach(function (order) {
            if (!productStockMap[order.product_id]) {
              productStockMap[order.product_id] = 0;
            }
            productStockMap[order.product_id] -= parseFloat(order.quantity || 0);
          });

          // Map products and include finalStockQuantity key
          updatedProducts = products.map(function (product) {
            var calculatedStock = (product.stock_quantity || 0) + (productStockMap[product.id] || 0);
            return _objectSpread(_objectSpread({}, product), {}, {
              finalStockQuantity: product.stock_quantity // Add the calculated stock quantity
            });
          });
          return _context3.abrupt("return", res.status(200).json(updatedProducts));
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.error('Error fetching products:', _context3.t0.message, _context3.t0.stack);
          return _context3.abrupt("return", res.status(500).json({
            message: 'Internal server error',
            error: _context3.t0.message
          }));
        case 26:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Get all products for the user
exports.getAllProductsForUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$user2, role_name, id, currentDate, products, receivedOrders, soldOrders, productStockMap, productsWithPrices;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$user2 = req.user, role_name = _req$user2.role_name, id = _req$user2.id; // Assuming the user's role is available in req.user
          // Get the current date for checking the price validity
          currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
          // Find all products with necessary conditions
          _context4.next = 5;
          return Product.findAll({
            where: {
              isDeleted: false,
              status: "1" // Ensure string comparison for status
            }
          });
        case 5:
          products = _context4.sent;
          _context4.next = 8;
          return OrderItem.findAll({
            where: {
              '$order.status$': 'Accepted',
              '$order.user_id$': id
            },
            attributes: ['product_id', 'quantity'],
            // Assuming quantity represents total_order_quantity
            include: [{
              model: Order,
              as: 'order',
              where: {
                status: 'Accepted',
                user_id: id
              },
              attributes: [] // Exclude unnecessary attributes from the order
            }]
          });
        case 8:
          receivedOrders = _context4.sent;
          _context4.next = 11;
          return OrderItem.findAll({
            where: {
              '$order.status$': 'Accepted',
              '$order.higher_role_id$': id
            },
            attributes: ['product_id', 'quantity'],
            // Assuming quantity represents total_order_quantity
            include: [{
              model: Order,
              as: 'order',
              where: {
                status: 'Accepted',
                higher_role_id: id
              },
              attributes: [] // Exclude unnecessary attributes from the order
            }]
          });
        case 11:
          soldOrders = _context4.sent;
          // Calculate stock quantity dynamically
          productStockMap = {}; // Aggregate received quantities
          receivedOrders.forEach(function (order) {
            if (!productStockMap[order.product_id]) {
              productStockMap[order.product_id] = 0;
            }
            productStockMap[order.product_id] += parseFloat(order.quantity || 0);
          });

          // Aggregate sold quantities
          soldOrders.forEach(function (order) {
            if (!productStockMap[order.product_id]) {
              productStockMap[order.product_id] = 0;
            }
            productStockMap[order.product_id] -= parseFloat(order.quantity || 0);
          });

          // Map over the products to check for auto-update prices
          productsWithPrices = products.map(function (product) {
            // let priceDetails = {};
            var stockQuantity = productStockMap[product.id] || 0;
            var priceDetails = {
              offerPrice: null,
              // Default to null
              originalPrice: product.price,
              // Default original price to the base price
              Status: product.status,
              // Correctly assigning status
              Category: product.category_name,
              // Correctly assigning category name
              productVolume: product.productVolume,
              // Correctly assigning category name
              quantity_type: product.quantity_type,
              // Correctly assigning category name
              stock_quantity: product.stock_quantity // Correctly assigning category name
            };

            // Ensure `fromDate` and `toDate` are properly formatted for comparison
            var fromDate = new Date(product.fromDate).toISOString().split('T')[0];
            var toDate = new Date(product.toDate).toISOString().split('T')[0];

            // Check if auto-update is enabled and within the valid date range
            var isOfferValid = product.autoUpdate === true && currentDate >= fromDate && currentDate <= toDate;
            if (isOfferValid) {
              // Set offer price based on role if offer is valid
              switch (role_name) {
                case 'Super Distributor':
                  priceDetails.offerPrice = product.SD_price;
                  break;
                case 'Distributor':
                  priceDetails.offerPrice = product.distributor_price;
                  break;
                case 'Master Distributor':
                  priceDetails.offerPrice = product.MD_price;
                  break;
                case 'Area Development Officer':
                  priceDetails.offerPrice = product.ADO_price;
                  break;
                case 'Customer':
                  priceDetails.offerPrice = product.customer_price;
                  break;
                default:
                  priceDetails.offerPrice = product.price;
                  break;
              }
            }

            // Determine original price based on the role
            switch (role_name) {
              case 'Super Distributor':
                priceDetails.originalPrice = product.sdPrice;
                break;
              case 'Distributor':
                priceDetails.originalPrice = product.distributorPrice;
                break;
              case 'Master Distributor':
                priceDetails.originalPrice = product.mdPrice;
                break;
              case 'Area Development Officer':
                priceDetails.originalPrice = product.adoPrice;
                break;
              case 'Customer':
                priceDetails.originalPrice = product.price;
                break;
              default:
                priceDetails.originalPrice = product.price;
                break;
            }

            // Return the final product details with both offer price and original price
            return {
              id: product.id,
              name: product.name,
              image: product.image,
              // super1: priceDetails.super,
              // stock_quantity: product.stock_quantity,
              stock_quantity: stockQuantity,
              super1: priceDetails.offerPrice,
              originalPrice: priceDetails.originalPrice,
              category_name: product.category_name,
              // Correctly assigning category name
              status: product.status,
              // Correctly assigning status
              productVolume: product.productVolume,
              // Correctly assigning status
              quantity_type: product.quantity_type // Correctly assigning status
              // stock_quantity: product.stock_quantity, // Correctly assigning status
            };
          }); // Return the response with the mapped products and their prices
          return _context4.abrupt("return", res.status(200).json(productsWithPrices));
        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](0);
          console.error("Error fetching products:", _context4.t0);
          return _context4.abrupt("return", handleErrors(res, _context4.t0));
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 19]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//******  Get a single product by ID for Admin *****//
exports.getProductById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var product;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Product.findOne({
            where: {
              id: req.params.id,
              isDeleted: false
            }
          });
        case 3:
          product = _context5.sent;
          if (product) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: 'Product not found'
          }));
        case 6:
          return _context5.abrupt("return", res.status(200).json(product));
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", handleErrors(res, _context5.t0));
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

//////***** User get id products *****////
// exports.getProductByIdForUser = async (req, res) => {
//   try {
//      const product = await Product.findOne({
//        where: {  
//         id: req.params.id,
//          isDeleted: false,
//          status: true
//          }
//     });
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     return res.status(200).json(product);
//   } catch (error) {
//     return handleErrors(res, error);
//   }
// };

exports.getProductByIdForUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var product, productId, userId, receivedOrders, soldOrders, stockQuantity;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return Product.findOne({
            where: {
              id: req.params.id,
              isDeleted: false,
              status: true
            }
          });
        case 3:
          product = _context6.sent;
          if (product) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            error: 'Product not found'
          }));
        case 6:
          productId = product.id; // Extract product ID
          userId = req.user.id; // Assuming the user ID is in req.use
          // Fetch received quantities for this product
          _context6.next = 10;
          return OrderItem.findAll({
            where: {
              product_id: productId,
              // Filter by product ID
              '$order.status$': 'Accepted',
              '$order.user_id$': userId
            },
            attributes: ['quantity'],
            // Fetch only quantity
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
        case 10:
          receivedOrders = _context6.sent;
          _context6.next = 13;
          return OrderItem.findAll({
            where: {
              product_id: productId,
              // Filter by product ID
              '$order.status$': 'Accepted',
              '$order.higher_role_id$': userId
            },
            attributes: ['quantity'],
            // Fetch only quantity
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
        case 13:
          soldOrders = _context6.sent;
          // Calculate stock quantity
          stockQuantity = 0; // Aggregate received quantities
          receivedOrders.forEach(function (order) {
            stockQuantity += parseFloat(order.quantity || 0);
          });

          // Subtract sold quantities
          soldOrders.forEach(function (order) {
            stockQuantity -= parseFloat(order.quantity || 0);
          });
          product.stock_quantity = stockQuantity;
          return _context6.abrupt("return", res.status(200).json(product));
        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](0);
          console.error('Error fetching product:', _context6.t0);
          return _context6.abrupt("return", handleErrors(res, _context6.t0));
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 21]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// //***  Soft delete a product ***//
exports.deleteProduct = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _yield$Product$update, _yield$Product$update2, updatedRows;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return Product.update({
            isDeleted: 1
          }, {
            where: {
              id: req.params.id,
              isDeleted: 0
            }
          });
        case 3:
          _yield$Product$update = _context7.sent;
          _yield$Product$update2 = _slicedToArray(_yield$Product$update, 1);
          updatedRows = _yield$Product$update2[0];
          if (!(updatedRows === 0)) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            error: 'Product not found or already deleted'
          }));
        case 8:
          return _context7.abrupt("return", res.status(200).json({
            message: 'Product soft-deleted successfully'
          }));
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            error: 'An error occurred while deleting the product'
          }));
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// Function to check for expired offers and update products every 30 seconds
function autoUpdateProducts() {
  setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var currentDate, productsToUpdate, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          currentDate = new Date();
          _context8.next = 4;
          return Product.findAll({
            where: {
              isDeleted: 0,
              toDate: _defineProperty({}, Op.lt, currentDate)
            }
          });
        case 4:
          productsToUpdate = _context8.sent;
          _context8.next = 7;
          return Product.update({
            autoUpdate: false,
            customer_price: 0,
            ADO_price: 0,
            MD_price: 0,
            SD_price: 0,
            distributor_price: 0,
            fromDate: null,
            toDate: null
          }, {
            where: {
              isDeleted: 0,
              toDate: _defineProperty({}, Op.lt, currentDate)
            }
          });
        case 7:
          result = _context8.sent;
          productsToUpdate.forEach(function (product) {
            console.log("Product ID ".concat(product.id, " updated successfully."));
          });
          _context8.next = 14;
          break;
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.error('Error updating products:', _context8.t0);
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 11]]);
  })), 2 * 1000);
}

// autoUpdateProducts();

///////********Update Product Status**********///////

exports.updateProductStatus = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var id, status, product;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.params.id;
          status = req.body.status; // Fetch the existing product
          _context9.next = 5;
          return Product.findByPk(id);
        case 5:
          product = _context9.sent;
          if (product) {
            _context9.next = 8;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            error: 'Product not found'
          }));
        case 8:
          _context9.next = 10;
          return product.update({
            status: status
          });
        case 10:
          return _context9.abrupt("return", res.status(200).json(product));
        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](0);
          return _context9.abrupt("return", res.status(500).json({
            error: _context9.t0.message
          }));
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 13]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();