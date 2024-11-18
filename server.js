// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const { sequelize } = require('./models');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const memberRoutes = require('./routes/userHierarchyGetRoutes');
const directMemberRoutes = require('./routes/userDirectHierarchyRoutes');
const orderRoutes = require('./routes/orderRouts');
const rolsRoutes = require('./routes/rolesRoutes');
const clubRoutes = require('./routes/clubRoutes');
const salesTargetrRoutes = require('./routes/salesTargetrRoutes');
const minimumStockRoutes = require('./routes/minimumStockRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const userSalesDetailRoutes = require('./routes/userSalesDetailRoutes');
const sectorAdminRoutes = require('./routes/sectorRoutes');
const notificationRoutes = require('./routes/monthly_notificationRoute/monthlyNotificationRoutes'); 



const announcementRoutes = require('./routes/announcementRoutes');
const documentRoutes = require('./routes/documentRoutes'); 
const editRequestRoutes = require('./routes/editRequestRoutes'); 
const userUpdateRoutes = require('./routes/userupdateRoutes');
const requestRoutes = require('./routes/requestRoutes');
const ordersRoutes = require('./routes/ordersRoutes'); // Ensure the path is correct
const orderLimitRoutes = require('./routes/orderLimitRoutes'); // Adjust the path as necessary
const path = require('path');
const cron = require('node-cron');
const { sendMonthlyNotifications } = require('./controllers/monthly_notification/sendMonthlyNotifications');

const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();
const port = process.env.PORT || 3002;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use('/salestarget', salesTargetrRoutes);

// Pass `io` to the routes where needed
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
app.use('/api', userUpdateRoutes); // Use /api prefix for member update route
app.use('/user_sales_detail',userSalesDetailRoutes)
app.use('/api/requests', requestRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/order-limits', orderLimitRoutes); // Mount the order limit routes

// Announcement routes
app.use('/announcements', (req, res, next) => {
  req.io = io; // Attach `io` to the request object for announcement routes
  next();
}, announcementRoutes);

// Document routes
app.use('/documents', (req, res, next) => {
  req.io = io; // Attach `io` to the request object for document routes
  next();
}, documentRoutes);

app.use('/edit-requests', editRequestRoutes);
//sector Routes
app.use('/sectors',sectorAdminRoutes);



io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Schedule monthly notification job
cron.schedule('0 12 15 * *', async () => {
  console.log('Running monthly notification job...');
  try {
    await sendMonthlyNotifications();
  } catch (error) {
    console.error('Error in monthly notification job:', error);
  }
});
//**send-notifications don't call this api --> only for development**//
app.use('/month_notifications', notificationRoutes);

server.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
