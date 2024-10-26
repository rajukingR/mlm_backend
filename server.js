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



const announcementRoutes = require('./routes/announcementRoutes');
const documentRoutes = require('./routes/documentRoutes'); // Import your document routes
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
app.use('/uploads', express.static('uploads'));

// Pass `io` to the routes where needed
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/category', authMiddleware, categoryRoutes);
app.use('/members', memberRoutes);
app.use('/directMembers', directMemberRoutes);
app.use('/orders', orderRoutes);
app.use('/roles', rolsRoutes);
app.use('/club', clubRoutes);
app.use('/salestarget', salesTargetrRoutes);
app.use('/minimumstock', minimumStockRoutes);
app.use('/feedback', feedbackRoutes);

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

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
