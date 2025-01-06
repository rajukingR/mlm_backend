const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Import the User model

// Controller function for user login
exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find user by username
    const user = await User.findOne({
      where: { username }
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password matches (Here, you can replace with password hashing check if needed)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role_name: user.role_name },
      process.env.JWT_SECRET, // Ensure you have this in your .env file
      { expiresIn: '1h' } // Set an expiration time (optional)
    );

    // Send response with token
    return res.status(200).json({
      message: 'Login successful',
      user: {
        role_id: user.role_id,
        username: user.username,
        role_name: user.role_name
      },
      token: token, 

    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
};
