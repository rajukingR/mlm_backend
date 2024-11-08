const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// User sign-up
exports.signUp = async (req, res) => {
  try {
    const { username, password, email, role_id, pincode, state, city, street_name, building_no_name, mobile_number, superior_id } = req.body;

    // Validate required fields
    if (!username || !password || !email || !role_id || !mobile_number) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Check if the role_id exists in the roles table
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    // Check if superior_id is provided for non-admin roles and if it exists in the users table
    if (role.role_name !== 'Admin' && !superior_id) {
      return res.status(400).json({ error: 'Superior ID is required for non-admin roles' });
    }

    if (superior_id) {
      const superiorUser = await User.findByPk(superior_id);
      if (!superiorUser) {
        return res.status(400).json({ error: 'Superior ID does not exist' });
      }
      // Additional validation to check if the superior has the correct role (if needed)
      if (superiorUser.role_name === 'Admin') {
        return res.status(400).json({ error: 'Admin cannot be a superior' });
      }
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

    // Create a new user
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
      role_name: role.role_name,
      superior_id: role.role_name === 'Admin' ? null : superior_id
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User sign-in
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is incorrect, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role_name
      },
      process.env.JWT_SECRET, // Ensure this is set in your .env file
      { expiresIn: '10h' } // Token expiry time
    );

    // Return the token and user details (excluding the password)
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role_name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//**  Fetch admin details **//
exports.getAdminDetails = async (req, res) => {
  try {
    // Fetch the admin's details (you can limit or include specific fields if needed)
    const adminDetails = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // Exclude password from response
    });

    if (!adminDetails) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json(adminDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateAdmin = async (req, res) => {
  try {
    // Destructure the necessary fields from the request body
    const { full_name, email, pincode, state, city, street_name, building_no_name, mobile_number, country } = req.body;

    // Get the admin ID from the token
    const adminId = req.user.id;

    // Get the image path from the multer upload (if file is uploaded)
    const image = req.file ? req.file.path : null; // Image path is in req.file.path

    // Find the admin by ID (adminId from the token)
    const admin = await User.findByPk(adminId);

    // If admin not found, return an error
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Check if the email or mobile number already exists for another user (not the current admin)
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { mobile_number }
        ],
        id: { [Op.ne]: adminId } // Exclude the current admin
      }
    });

    // If email or mobile number already in use, return appropriate error
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      if (existingUser.mobile_number === mobile_number) {
        return res.status(400).json({ error: 'Mobile number already in use' });
      }
    }

    // Update the admin details (including full_name, excluding username, which is not editable)
    await admin.update({
      full_name,  // Update full name
      email,
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      country,  // Update country
      image     // Update image path if a new image was uploaded
    });

    // Return the updated admin data
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};
