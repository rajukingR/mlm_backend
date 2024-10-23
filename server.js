const express = require('express');
const cors = require('cors');
require('dotenv').config();

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
app.use('/category',authMiddleware, categoryRoutes);
app.use('/members',memberRoutes);
app.use('/directMembers',directMemberRoutes);
app.use('/orders',orderRoutes);
app.use('/roles',rolsRoutes);
app.use('/club',clubRoutes);
app.use('/salestarget', salesTargetrRoutes);





app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
