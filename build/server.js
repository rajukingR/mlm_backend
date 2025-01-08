"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// server.js
var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
// require('dotenv').config();
var http = require('http');
var https = require('https');
var fs = require('fs');
var _require = require('socket.io'),
  Server = _require.Server;
var _require2 = require('../models'),
  sequelize = _require2.sequelize;
var path = require('path');
var cron = require('node-cron');

// Routes
var adminRoutes = require('./routes/adminRoutes');
var userRoutes = require('./routes/userRoutes');
var productRoutes = require('./routes/productRoutes');
var categoryRoutes = require('./routes/categoryRoutes');
var memberRoutes = require('./routes/userHierarchyGetRoutes');
var directMemberRoutes = require('./routes/userDirectHierarchyRoutes');
var orderRoutes = require('./routes/orderRouts');
var rolsRoutes = require('./routes/rolesRoutes');
var clubRoutes = require('./routes/clubRoutes');
var salesTargetrRoutes = require('./routes/salesTargetrRoutes');
var minimumStockRoutes = require('./routes/minimumStockRoutes');
var feedbackRoutes = require('./routes/feedbackRoutes');
var userSalesDetailRoutes = require('./routes/userSalesDetailRoutes');
var sectorAdminRoutes = require('./routes/sectorRoutes');
var notificationRoutes = require('./routes/monthly_notificationRoute/monthlyNotificationRoutes');
var announcementRoutes = require('./routes/announcementRoutes');
var documentRoutes = require('./routes/documentRoutes');
var editRequestRoutes = require('./routes/editRequestRoutes');
var userUpdateRoutes = require('./routes/userupdateRoutes');
var requestRoutes = require('./routes/requestRoutes');
var ordersRoutes = require('./routes/ordersRoutes');
var orderLimitRoutes = require('./routes/orderLimitRoutes');
var forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');
var overalSalesRoutes = require('./routes/overall_sales_route/overalSalesRoutes');
var _require3 = require('./controllers/notification/monthly_notification/sendMonthlyNotifications'),
  sendMonthlyNotifications = _require3.sendMonthlyNotifications;
var envFile = ".env.".concat(process.env.NODE_ENV || 'development');
dotenv.config({
  path: envFile
});
var app = express();
var port = process.env.PORT || 4000;

// Environment Variables
var KERAMRUTH_DOMAIN_NAME = process.env.KERAMRUTH_DOMAIN_NAME;
var isDevelopment = (process.env.NODE_ENV || 'development') === 'development';
var protocol = 'https';
// const protocol = isDevelopment ? 'http' : 'https';
// const KERAMRUTH_ERP_DOMAIN_NAME = isDevelopment ? `localerp.${KERAMRUTH_DOMAIN_NAME}` : `erp.${KERAMRUTH_DOMAIN_NAME}`;
// const KERAMRUTH_ERP_DOMAIN_NAME = process.env.KERAMRUTH_ERP_DOMAIN_NAME;
var KERAMRUTH_ERP_DOMAIN_NAME = "".concat(process.env.KERAMRUTH_ERP_SUBDOMAIN_PREFIX, ".").concat(KERAMRUTH_DOMAIN_NAME, " ");
// const KERAMRUTH_ERP_DOMAIN_NAME = isDevelopment ? KERAMRUTH_DOMAIN_NAME : `erp.${KERAMRUTH_DOMAIN_NAME}`;

// console.log(process.env.NODE_ENV)
// console.log(isDevelopment)
// console.log(KERAMRUTH_DOMAIN_NAME)

// SSL Options (only in production)
var sslOptions = isDevelopment ? {
  key: fs.readFileSync("C:/nginx-1.26.2/ssl/".concat(KERAMRUTH_DOMAIN_NAME, "-0001/privkey.pem")),
  cert: fs.readFileSync("C:/nginx-1.26.2/ssl/".concat(KERAMRUTH_DOMAIN_NAME, "-0001/fullchain.pem"))
} : {
  key: fs.readFileSync("/etc/letsencrypt/live/".concat(KERAMRUTH_DOMAIN_NAME, "-0001/privkey.pem")),
  cert: fs.readFileSync("/etc/letsencrypt/live/".concat(KERAMRUTH_DOMAIN_NAME, "-0001/fullchain.pem"))
};

// Create server (HTTP for development, HTTPS for production)
var server = https.createServer(sslOptions, app);
// const server = isDevelopment
//   ? http.createServer(app)
//   : https.createServer(sslOptions, app);

var allowedOrigins = ["".concat(protocol, "://").concat(KERAMRUTH_ERP_DOMAIN_NAME)];

// Socket.io setup
var io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    // origin: [`${protocol}://${KERAMRUTH_DOMAIN_NAME}`, `${protocol}://${KERAMRUTH_ERP_DOMAIN_NAME}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }
});
var corsOptions = {
  origin: allowedOrigins,
  // origin: [`${protocol}://${KERAMRUTH_DOMAIN_NAME}`, `${protocol}://${KERAMRUTH_ERP_DOMAIN_NAME}`],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  credentials: true,
  preflightContinue: false
};
console.log(corsOptions);
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "".concat(protocol, "://").concat(KERAMRUTH_ERP_DOMAIN_NAME));
  // res.header('Access-Control-Allow-Origin', `${protocol}://local${KERAMRUTH_ERP_DOMAIN_NAME}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
  next();
});

// // Socket.io setup
// const io = new Server(server, {
//   cors: isDevelopment
//     ? {} // No CORS for development
//     : {
//         origin: [`${protocol}://${KERAMRUTH_DOMAIN_NAME}`, `${protocol}://${KERAMRUTH_ERP_DOMAIN_NAME}`],
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//       },
// });

// // CORS setup (only in production)
// if (!isDevelopment) {
//   const corsOptions = {
//     origin: [`${protocol}://${KERAMRUTH_DOMAIN_NAME}`, `${protocol}://${KERAMRUTH_ERP_DOMAIN_NAME}`],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
//     credentials: true,
//     preflightContinue: false,
//   };

//   app.use(cors(corsOptions));
//   app.options('*', cors(corsOptions));
//   app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', `${protocol}://${KERAMRUTH_ERP_DOMAIN_NAME}`);
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
//     next();
//   });
// }

// Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/uploads', express["static"](path.join(__dirname, 'uploads')));

// Routes
app.use('/salestarget', salesTargetrRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/products', productRoutes);
app.use('/category', categoryRoutes);
app.use('/members', memberRoutes);
app.use('/directMembers', directMemberRoutes);
app.use('/orders', orderRoutes);
app.use('/roles', rolsRoutes);
app.use('/club', clubRoutes);
app.use('/minimumstock', minimumStockRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/api', userUpdateRoutes);
app.use('/user_sales_detail', userSalesDetailRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/order-limits', orderLimitRoutes);
app.use('/forgot-password', forgotPasswordRoutes);
app.use('/announcements', function (req, res, next) {
  req.io = io;
  next();
}, announcementRoutes);
app.use('/documents', function (req, res, next) {
  req.io = io;
  next();
}, documentRoutes);
app.use('/edit-requests', editRequestRoutes);
app.use('/sectors', sectorAdminRoutes);
app.use('/overall_sales', overalSalesRoutes);
app.get('/', function (req, res) {
  res.send('Welcome to the server!');
});

// Socket.io events
io.on('connection', function (socket) {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', function () {
    console.log('User disconnected:', socket.id);
  });
});

// Cron job for monthly notifications
cron.schedule('0 12 15 * *', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        console.log('Running monthly notification job...');
        _context.prev = 1;
        _context.next = 4;
        return sendMonthlyNotifications();
      case 4:
        _context.next = 9;
        break;
      case 6:
        _context.prev = 6;
        _context.t0 = _context["catch"](1);
        console.error('Error in monthly notification job:', _context.t0);
      case 9:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[1, 6]]);
})));

// Start server
server.listen(port, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.prev = 0;
        _context2.next = 3;
        return sequelize.authenticate();
      case 3:
        console.log('Database connected...');
        console.log("Server running in ".concat(isDevelopment ? 'development' : 'production', " mode on port ").concat(port));
        _context2.next = 10;
        break;
      case 7:
        _context2.prev = 7;
        _context2.t0 = _context2["catch"](0);
        console.error('Unable to connect to the database:', _context2.t0);
      case 10:
      case "end":
        return _context2.stop();
    }
  }, _callee2, null, [[0, 7]]);
})));

// // server.js

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const http = require('http');
// const { Server } = require('socket.io');
// const { sequelize } = require('./models');
// const adminRoutes = require('./routes/adminRoutes');
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const memberRoutes = require('./routes/userHierarchyGetRoutes');
// const directMemberRoutes = require('./routes/userDirectHierarchyRoutes');
// const orderRoutes = require('./routes/orderRouts');
// const rolsRoutes = require('./routes/rolesRoutes');
// const clubRoutes = require('./routes/clubRoutes');
// const salesTargetrRoutes = require('./routes/salesTargetrRoutes');
// const minimumStockRoutes = require('./routes/minimumStockRoutes');
// const feedbackRoutes = require('./routes/feedbackRoutes');
// const userSalesDetailRoutes = require('./routes/userSalesDetailRoutes');
// const sectorAdminRoutes = require('./routes/sectorRoutes');
// const notificationRoutes = require('./routes/monthly_notificationRoute/monthlyNotificationRoutes');  

// const announcementRoutes = require('./routes/announcementRoutes');
// const documentRoutes = require('./routes/documentRoutes'); 
// const editRequestRoutes = require('./routes/editRequestRoutes'); 
// const userUpdateRoutes = require('./routes/userupdateRoutes');
// const requestRoutes = require('./routes/requestRoutes');
// const ordersRoutes = require('./routes/ordersRoutes'); // Ensure the path is correct
// const orderLimitRoutes = require('./routes/orderLimitRoutes'); // Adjust the path as necessary
// const path = require('path');
// const cron = require('node-cron');
// const { sendMonthlyNotifications } = require('./controllers/notification/monthly_notification/sendMonthlyNotifications');
// const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');
// const overalSalesRoutes = require('./routes/overall_sales_route/overalSalesRoutes')

// const { authMiddleware } = require('./middlewares/authMiddleware');

// const app = express();
// const port = process.env.PORT || 4000;
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.urlencoded({ extended: true }));
// app.use('/salestarget', salesTargetrRoutes);

// // Pass `io` to the routes where needed
// app.use('/api/admin', adminRoutes);
// app.use('/api/user', userRoutes);
// app.use('/products', productRoutes);
// app.use('/category', categoryRoutes);
// app.use('/members', memberRoutes);
// app.use('/directMembers', directMemberRoutes);
// app.use('/orders', orderRoutes);
// app.use('/roles', rolsRoutes);
// app.use('/club', clubRoutes);
// app.use('/minimumstock', minimumStockRoutes);
// app.use('/feedback', feedbackRoutes);
// app.use('/api', userUpdateRoutes); // Use /api prefix for member update route
// app.use('/user_sales_detail',userSalesDetailRoutes)
// app.use('/api/requests', requestRoutes);
// app.use('/api/orders', ordersRoutes);
// app.use('/api/order-limits', orderLimitRoutes); // Mount the order limit routes
// app.use('/forgot-password', forgotPasswordRoutes);

// // Announcement routes
// app.use('/announcements', (req, res, next) => {
//   req.io = io; // Attach `io` to the request object for announcement routes
//   next();
// }, announcementRoutes);

// // Document routes
// app.use('/documents', (req, res, next) => {
//   req.io = io; // Attach `io` to the request object for document routes
//   next();
// }, documentRoutes);

// app.use('/edit-requests', editRequestRoutes);
// //sector Routes
// app.use('/sectors',sectorAdminRoutes);
// //**Overall Sales Calcultion route**//
// app.use('/overall_sales', overalSalesRoutes);

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // Schedule monthly notification job
// cron.schedule('0 12 15 * *', async () => {
//   console.log('Running monthly notification job...');
//   try {
//     await sendMonthlyNotifications();
//   } catch (error) {
//     console.error('Error in monthly notification job:', error);
//   }
// });
// //**send-notifications don't call this api --> only for development**//
// app.use('/month_notifications', notificationRoutes);

// server.listen(port, async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connected...');
//     console.log(`Server running on port ${port}`);
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// });