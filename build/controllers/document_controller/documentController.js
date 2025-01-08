"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require('../../../models'),
  Document = _require.Document,
  User = _require.User,
  Notification = _require.Notification;
var _require2 = require('sequelize'),
  Op = _require2.Op;
var moment = require('moment'); // Import moment.js

exports.getDocuments = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var role_name, whereClause, documents, allowedRoles, filteredDocuments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          role_name = req.user.role_name; // Get role directly from the token
          whereClause = {}; // Check the role and set the where clause for filtering
          if (role_name === 'Admin') {
            // Admin can view all documents
            whereClause = {};
          } else if (role_name === 'Distributor') {
            // Filter documents for Distributor role
            whereClause = {
              receiver: _defineProperty({}, Op.like, '%Distributor%')
            };
          } else {
            // Non-admin roles can only see documents relevant to them
            whereClause = {
              receiver: _defineProperty({}, Op.like, "%".concat(role_name, "%"))
            };
          }

          // Add date range filtering: Ensure that the document is active within the date range
          whereClause = _objectSpread(_objectSpread({}, whereClause), {}, {
            fromDate: _defineProperty({}, Op.lte, moment().toDate()),
            toDate: _defineProperty({}, Op.gte, moment().toDate()),
            status: 'active' // Only active documents
            // autoUpdate: 1, // Only active documents
          });

          // Fetch documents from database based on the whereClause
          _context.next = 7;
          return Document.findAll({
            where: whereClause
          });
        case 7:
          documents = _context.sent;
          if (documents.length) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            success: false,
            message: "No documents found for the user's role"
          }));
        case 10:
          // Ensure the receiver field is an array and validate against allowed roles
          allowedRoles = ['Area Development Officer', 'Master Distributor', 'Super Distributor', 'Distributor', 'Customer'];
          filteredDocuments = documents.filter(function (doc) {
            var receivers;
            try {
              // Log the receiver field for debugging purposes
              console.log("Receiver field:", doc.receiver);

              // Try to parse the receiver field into an array if it's a string
              if (typeof doc.receiver === 'string') {
                receivers = JSON.parse(doc.receiver); // Try parsing if it's a string
              } else if (Array.isArray(doc.receiver)) {
                receivers = doc.receiver; // If it's already an array, use it directly
              } else {
                receivers = [];
              }

              // Log the parsed receivers array for debugging
              console.log("Parsed receivers:", receivers);

              // Check if the user's role exists in the receivers array
              return receivers.some(function (receiver) {
                return receiver.trim() === role_name;
              }); // Add .trim() to avoid issues with spaces
            } catch (e) {
              console.error("Error parsing receiver field:", e);
              receivers = [];
              return false;
            }
          });
          if (filteredDocuments.length) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            success: false,
            message: "No documents found for the user's role"
          }));
        case 14:
          return _context.abrupt("return", res.status(200).json({
            success: true,
            data: filteredDocuments
          }));
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch documents',
            error: _context.t0.message
          }));
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Get all documents with optional filtering by receiver
exports.getDocumentsAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var receiver, whereClause, documents;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          receiver = req.query.receiver; // Extract receiver from query params
          whereClause = receiver ? {
            receiver: receiver
          } : {}; // Set where clause based on receiver
          _context2.next = 5;
          return Document.findAll({
            where: whereClause
          });
        case 5:
          documents = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            data: documents
          }));
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch documents',
            error: _context2.t0.message
          }));
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// // Get all documents with optional filtering by receiver
// exports.getDocuments = async (req, res) => {
//   try {
//     const { receiver } = req.query; // Extract receiver from query params
//     const whereClause = receiver ? { receiver } : {}; // Set where clause based on receiver

//     const documents = await Document.findAll({ where: whereClause });

//     return res.status(200).json({
//       success: true,
//       data: documents,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch documents',
//       error: error.message,
//     });
//   }
// };

// Get a document by ID
exports.getByIdDocument = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, document;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return Document.findByPk(id);
        case 4:
          document = _context3.sent;
          if (document) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: 'Document not found'
          }));
        case 7:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            data: document
          }));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to fetch document',
            error: _context3.t0.message
          }));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Create a new document
exports.createDocument = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, documentID, heading, description, link, receiver, autoUpdate, fromDate, toDate, status, documentStatus, allowedMimeType, document, parsedReceiver, users, notifications;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, documentID = _req$body.documentID, heading = _req$body.heading, description = _req$body.description, link = _req$body.link, receiver = _req$body.receiver, autoUpdate = _req$body.autoUpdate, fromDate = _req$body.fromDate, toDate = _req$body.toDate, status = _req$body.status;
          _context4.prev = 1;
          // Set the default status if not provided
          documentStatus = status || 'active'; // Default status to 'active'
          allowedMimeType = 'image/';
          if (!(req.file && !req.file.mimetype.startsWith(allowedMimeType))) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid image format. Only image files are allowed.'
          }));
        case 6:
          _context4.next = 8;
          return Document.create({
            documentID: documentID,
            heading: heading,
            description: description,
            link: link,
            receiver: receiver,
            autoUpdate: autoUpdate,
            status: documentStatus,
            // Use the default or provided status
            fromDate: autoUpdate ? fromDate : null,
            toDate: autoUpdate ? toDate : null,
            image: req.file ? req.file.filename : null // Save only the filename
          });
        case 8:
          document = _context4.sent;
          // Emit event for new document
          req.io.emit('new_document', document);

          /////////////**********Notification******* */
          parsedReceiver = typeof receiver === 'string' ? JSON.parse(receiver) : receiver;
          if (!(parsedReceiver.length > 0)) {
            _context4.next = 18;
            break;
          }
          _context4.next = 14;
          return User.findAll({
            where: {
              role_name: _defineProperty({}, Op["in"], parsedReceiver)
            }
          });
        case 14:
          users = _context4.sent;
          notifications = users.map(function (user) {
            return {
              user_id: user.id,
              message: "New Document: ".concat(heading),
              is_read: false,
              created_at: new Date(),
              detail: {
                link: link,
                receiver: parsedReceiver,
                user_name: user.full_name,
                image: req.file ? req.file.filename : null,
                type: "document"
              }
            };
          }); // Insert notifications in bulk
          _context4.next = 18;
          return Notification.bulkCreate(notifications);
        case 18:
          return _context4.abrupt("return", res.status(201).json({
            success: true,
            data: document
          }));
        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](1);
          console.error('Error creating document:', _context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to create document',
            error: _context4.t0.message
          }));
        case 25:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 21]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Update a document by ID
exports.updateByIdDocument = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, _req$body2, documentID, heading, description, link, receiver, autoUpdate, fromDate, toDate, document;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, documentID = _req$body2.documentID, heading = _req$body2.heading, description = _req$body2.description, link = _req$body2.link, receiver = _req$body2.receiver, autoUpdate = _req$body2.autoUpdate, fromDate = _req$body2.fromDate, toDate = _req$body2.toDate;
          _context5.prev = 2;
          _context5.next = 5;
          return Document.findByPk(id);
        case 5:
          document = _context5.sent;
          if (document) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            success: false,
            message: "Document not found"
          }));
        case 8:
          document.status = "active";
          document.documentID = documentID || document.documentID;
          document.heading = heading || document.heading;
          document.description = description || document.description;
          document.link = link || document.link;
          if (receiver) {
            document.receiver = Array.isArray(receiver) ? receiver : JSON.parse(receiver);
          }
          document.autoUpdate = autoUpdate !== undefined ? autoUpdate : document.autoUpdate;
          if (autoUpdate) {
            document.fromDate = fromDate || document.fromDate;
            document.toDate = toDate || document.toDate;
          }
          if (req.file) {
            document.image = req.file.filename;
          }
          _context5.next = 19;
          return document.save();
        case 19:
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            data: document
          }));
        case 22:
          _context5.prev = 22;
          _context5.t0 = _context5["catch"](2);
          console.error("Error updating document:", _context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            success: false,
            message: "Failed to update document",
            error: _context5.t0.message
          }));
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 22]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Delete a document by ID
exports.deleteByIdDocument = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, document;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return Document.findByPk(id);
        case 4:
          document = _context6.sent;
          if (document) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            success: false,
            message: 'Document not found'
          }));
        case 7:
          _context6.next = 9;
          return document.destroy();
        case 9:
          req.io.emit('delete_document', {
            id: id
          });
          return _context6.abrupt("return", res.status(200).json({
            success: true,
            message: 'Document deleted successfully'
          }));
        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", res.status(500).json({
            success: false,
            message: 'Failed to delete document',
            error: _context6.t0.message
          }));
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 13]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// Function to check for expired documents and update them every 10 seconds
function autoUpdateDocuments() {
  setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var now, documentsToUpdate, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          now = moment().startOf('day').toDate(); // Local time (start of the day)
          _context7.next = 4;
          return Document.findAll({
            where: {
              autoUpdate: 1,
              // Filter for documents with autoUpdate set to 1
              toDate: _defineProperty({}, Op.lt, now)
            }
          });
        case 4:
          documentsToUpdate = _context7.sent;
          _context7.next = 7;
          return Document.update({
            autoUpdate: 0,
            fromDate: null,
            toDate: null,
            status: "Expired"
          }, {
            where: {
              autoUpdate: 1,
              toDate: _defineProperty({}, Op.lt, now)
            }
          });
        case 7:
          result = _context7.sent;
          // Log the updates for each document
          documentsToUpdate.forEach(function (document) {
            console.log("Document ID ".concat(document.id, " updated successfully."));
          });
          _context7.next = 14;
          break;
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error('Error updating documents:', _context7.t0);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  })), 30 * 1000); // Call the function every 10 seconds
}

// autoUpdateDocuments();