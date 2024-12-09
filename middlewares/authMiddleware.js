const jwt = require('jsonwebtoken');
const { User } = require('../models');

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

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check if the user is authorized based on role_id
const isAdmin = (req, res, next) => {
  // Allow access for users with role_id 1, 2, 3, 4, or 5
  const allowedRoles = [1, 2, 3, 4, 5];
  if (!allowedRoles.includes(req.user.role_id)) {
    return res.status(403).json({ error: 'Access denied. Only specific roles are allowed.' });
  }
  next();
};

module.exports = { authMiddleware, isAdmin };
