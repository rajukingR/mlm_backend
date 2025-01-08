'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require('../../../models'),
  EditRequest = _require.EditRequest,
  Notification = _require.Notification,
  User = _require.User;
var _require2 = require('express-validator'),
  body = _require2.body,
  validationResult = _require2.validationResult;

// Get all edit requests
exports.getEditRequests = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var editRequests;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return EditRequest.findAll();
        case 3:
          editRequests = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            data: editRequests
          }));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch edit requests',
            error: _context.t0.message
          }));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Get an edit request by ID
exports.getByIdEditRequest = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, editRequest;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return EditRequest.findByPk(id);
        case 4:
          editRequest = _context2.sent;
          if (editRequest) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: 'Edit request not found'
          }));
        case 7:
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            data: editRequest
          }));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch edit request',
            error: _context2.t0.message
          }));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 10]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createEditRequest = [
// Validation middleware
body('user_id').isInt().withMessage('User ID must be an integer'), body('role_id').isInt().withMessage('Role ID must be an integer'), body('request_reason').isString().notEmpty().withMessage('Request reason is required'), (/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var errors, _req$body, user_id, role_id, request_reason, new_mobile_number, new_email_id, new_address, user, image, newEditRequest, notificationMessage;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          errors = validationResult(req);
          if (errors.isEmpty()) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
          }));
        case 3:
          _req$body = req.body, user_id = _req$body.user_id, role_id = _req$body.role_id, request_reason = _req$body.request_reason, new_mobile_number = _req$body.new_mobile_number, new_email_id = _req$body.new_email_id, new_address = _req$body.new_address;
          _context3.prev = 4;
          _context3.next = 7;
          return User.findByPk(user_id, {
            attributes: ['id', 'username', 'full_name', 'role_name', 'image']
          });
        case 7:
          user = _context3.sent;
          if (user) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 10:
          // Image format validation is handled in the `upload` middleware
          image = req.file ? req.file.filename : null;
          _context3.next = 13;
          return EditRequest.create({
            user_id: user_id,
            role_id: role_id,
            request_reason: request_reason,
            new_mobile_number: new_mobile_number,
            new_email_id: new_email_id,
            new_address: new_address,
            image: image
          });
        case 13:
          newEditRequest = _context3.sent;
          ///**profile Natification*///
          // Add a notification entry
          notificationMessage = "Profile Edit Request: by user ".concat(user.full_name, " ");
          _context3.prev = 15;
          _context3.next = 18;
          return Notification.create({
            user_id: 1,
            message: notificationMessage,
            photo: user.image,
            detail: {
              user_name: user.full_name,
              request_reason: request_reason,
              role: user.role_name,
              type: 'profile_edite_request'
            }
          });
        case 18:
          _context3.next = 23;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](15);
          console.error('Error creating notification:', _context3.t0);
        case 23:
          return _context3.abrupt("return", res.status(201).json({
            success: true,
            message: 'Edit request created successfully',
            data: newEditRequest
          }));
        case 26:
          _context3.prev = 26;
          _context3.t1 = _context3["catch"](4);
          console.error('Error creating edit request:', _context3.t1);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to create edit request',
            error: _context3.t1.message
          }));
        case 30:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 26], [15, 20]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}())];
exports.rejectByIdEditRequest = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, editRequest, user, notificationMessage;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return EditRequest.findByPk(id);
        case 4:
          editRequest = _context4.sent;
          if (editRequest) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: 'Edit request not found'
          }));
        case 7:
          _context4.next = 9;
          return User.findByPk(editRequest.user_id, {
            attributes: ['id', 'full_name', 'image', 'username']
          });
        case 9:
          user = _context4.sent;
          if (user) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: 'User not found'
          }));
        case 12:
          // Update the status to "Rejected"
          editRequest.status = 'Rejected';
          _context4.next = 15;
          return editRequest.save();
        case 15:
          // Save the updated request
          // Send Notification to the user who made the request
          notificationMessage = "Your profile edit request has been rejected by the admin.";
          _context4.prev = 16;
          _context4.next = 19;
          return Notification.create({
            user_id: user.id,
            // Send the notification to the user who made the request
            message: notificationMessage,
            photo: user.image,
            // Attach the user's image to the notification
            detail: {
              user_name: user.full_name,
              type: 'profile_edit_request_rejected'
            }
          });
        case 19:
          _context4.next = 24;
          break;
        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](16);
          console.error('Error creating rejection notification:', _context4.t0);
        case 24:
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            message: 'Edit request marked as rejected successfully'
          }));
        case 27:
          _context4.prev = 27;
          _context4.t1 = _context4["catch"](1);
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to update edit request status',
            error: _context4.t1.message
          }));
        case 30:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 27], [16, 21]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();