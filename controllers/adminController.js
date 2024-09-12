const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');



// Admin sign-up
exports.signUp = async (req, res) => {
  try {
    const { username, password, email, role_id, pincode, state, city, street_name, building_no_name, mobile_number } = req.body;

    // Validate required fields
    if (!username || !password || !email || !role_id || !mobile_number) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Check if username, email, or mobile number already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username },
          { email },
          { mobile_number }
        ]
      }
    });

    // If an existing user is found, return specific error messages
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already in use' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      if (existingUser.mobile_number === mobile_number) {
        return res.status(400).json({ error: 'Mobile number already in use' });
      }
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role_id,
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      role_name: 'admin' 
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Admin sign-in
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the admin user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, role_name: user.role_name }, process.env.JWT_SECRET, { expiresIn: '10h' });

    res.status(200).json({ 
      token,
      role_nmae: user.role_name,
      role_id: user.role_id,
      email: user.email,
      username: user.username,
      mobile_number: user.mobile_number,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
     });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};