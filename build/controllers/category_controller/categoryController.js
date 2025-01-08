'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require('../../../models'),
  Category = _require.Category;
var _require2 = require('express-validator'),
  validationResult = _require2.validationResult;
var _require3 = require('express-validator'),
  body = _require3.body;
var _require4 = require('sequelize'),
  Op = _require4.Op; // Add this line to import Op

// Validation rules for category creation
var categoryValidationRules = [body('category_name').notEmpty().withMessage('Category name is required')];

// Utility function to handle errors
var handleErrors = function handleErrors(res, error) {
  var statusCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return res.status(statusCode).json({
    error: error.message || 'An error occurred'
  });
};

// Create Category
exports.createCategory = [].concat(categoryValidationRules, [(
/*#__PURE__*/
// Validate request body
function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var errors, existingCategory, deletedCategory, newCategory;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Check validation errors
          errors = validationResult(req);
          if (errors.isEmpty()) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));
        case 4:
          _context.next = 6;
          return Category.findOne({
            where: {
              category_name: req.body.category_name,
              is_deleted: 0 // Only check for active categories
            }
          });
        case 6:
          existingCategory = _context.sent;
          if (!existingCategory) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            error: 'Category name already exists and is active.'
          }));
        case 9:
          _context.next = 11;
          return Category.findOne({
            where: {
              category_name: req.body.category_name,
              is_deleted: 1 // Check for soft-deleted categories
            }
          });
        case 11:
          deletedCategory = _context.sent;
          if (!deletedCategory) {
            _context.next = 16;
            break;
          }
          _context.next = 15;
          return deletedCategory.update({
            is_deleted: 0
          });
        case 15:
          return _context.abrupt("return", res.status(200).json({
            message: 'Category reactivated successfully',
            category: deletedCategory
          }));
        case 16:
          _context.next = 18;
          return Category.create({
            sector_name: req.body.sector_name,
            // optional
            category_name: req.body.category_name,
            // required
            is_deleted: 0 // Set it as active by default
          });
        case 18:
          newCategory = _context.sent;
          return _context.abrupt("return", res.status(201).json(newCategory));
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", handleErrors(res, _context.t0));
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 22]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}())]);

// Get all Categories
exports.getAllCategories = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var categories;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Category.findAll({
            where: {
              is_deleted: false
            }
          });
        case 3:
          categories = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(categories));
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", handleErrors(res, _context2.t0));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Get Category by ID
exports.getCategoryById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var category;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Category.findOne({
            where: {
              id: req.params.id,
              is_deleted: false
            }
          });
        case 3:
          category = _context3.sent;
          if (category) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            error: 'Category not found'
          }));
        case 6:
          return _context3.abrupt("return", res.status(200).json(category));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", handleErrors(res, _context3.t0));
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Update Category
exports.updateCategory = [].concat(categoryValidationRules, [(
/*#__PURE__*/
// Validate request body
function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var errors, categoryId, categoryName, existingCategory, deletedCategory, _yield$Category$updat, _yield$Category$updat2, updated;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // Check validation errors
          errors = validationResult(req);
          if (errors.isEmpty()) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));
        case 4:
          categoryId = req.params.id;
          categoryName = req.body.category_name; // Check if the category already exists (excluding the current category) and ensure it's not soft-deleted
          _context4.next = 8;
          return Category.findOne({
            where: {
              category_name: categoryName,
              id: _defineProperty({}, Op.ne, categoryId),
              // Exclude the current category
              is_deleted: 0 // Only check for active categories
            }
          });
        case 8:
          existingCategory = _context4.sent;
          if (!existingCategory) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.status(409).json({
            error: 'Category with this name already exists and is active'
          }));
        case 11:
          _context4.next = 13;
          return Category.findOne({
            where: {
              category_name: categoryName,
              is_deleted: 1 // Check for soft-deleted categories
            }
          });
        case 13:
          deletedCategory = _context4.sent;
          if (!deletedCategory) {
            _context4.next = 18;
            break;
          }
          _context4.next = 17;
          return deletedCategory.update({
            is_deleted: 0
          });
        case 17:
          return _context4.abrupt("return", res.status(200).json({
            message: 'Category reactivated successfully',
            category: deletedCategory
          }));
        case 18:
          _context4.next = 20;
          return Category.update(req.body, {
            where: {
              id: categoryId
            }
          });
        case 20:
          _yield$Category$updat = _context4.sent;
          _yield$Category$updat2 = _slicedToArray(_yield$Category$updat, 1);
          updated = _yield$Category$updat2[0];
          if (updated) {
            _context4.next = 25;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: 'Category not found'
          }));
        case 25:
          return _context4.abrupt("return", res.status(200).json({
            message: 'Category updated successfully'
          }));
        case 28:
          _context4.prev = 28;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", handleErrors(res, _context4.t0));
        case 31:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 28]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}())]);

// Delete Category (Mark as deleted)
exports.deleteCategory = [(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _yield$Category$updat3, _yield$Category$updat4, updated;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Category.update({
            is_deleted: true
          }, {
            where: {
              id: req.params.id
            }
          });
        case 3:
          _yield$Category$updat3 = _context5.sent;
          _yield$Category$updat4 = _slicedToArray(_yield$Category$updat3, 1);
          updated = _yield$Category$updat4[0];
          if (updated) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: 'Category not found'
          }));
        case 8:
          return _context5.abrupt("return", res.status(200).json({
            message: 'Category marked as deleted successfully'
          }));
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", handleErrors(res, _context5.t0));
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}())];