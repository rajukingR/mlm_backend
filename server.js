// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const { sequelize } = require('./models');

const path = require('path');
const cron = require('node-cron');

const { authMiddleware } = require('./middlewares/authMiddleware');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const consumerRoutes = require('./routes/consumerRoutes');
const clientRoutes = require('./routes/clientRoutes');

const customerRoutes = require('./routes/customerRoutes');


const app = express();
const port = process.env.PORT || 3002;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});



-app.use(cors());
app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/consumer', consumerRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/customer', customerRoutes);



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



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

server.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
