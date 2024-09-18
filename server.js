const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
//
const productRoutes = require('./routes/productRoutes');
const { authMiddleware } = require('./middlewares/authMiddleware');
//
// const authMiddleware = require('./middlewares/authMiddleware'); 


const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json()); // Using express.json() to parse JSON bodies
// app.use(authMiddleware); // Apply authMiddleware globally

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/products',authMiddleware, productRoutes);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
