const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.error('User not found in database');
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;  // Set the user information to the request object
    next();  // Move to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role_id !== 1) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();  // Move to the next middleware or route handler
};

// Middleware to set role_id for Client
const setClientRole = (req, res, next) => {
  // If the logged-in user is not an admin, set role_id to 2 (Client)
  if (req.user.role_id !== 1) {
    req.user.role_id = 2;  // Set the role to Client
  }
  next();  // Move to the next middleware or route handler
};

module.exports = { authMiddleware, isAdmin, setClientRole };
