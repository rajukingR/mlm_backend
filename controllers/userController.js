const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Define role hierarchy
const roleHierarchy = {
  Admin: 1,
  'Area Development Officer': 2,
  'Master Distributor': 3,
  'Super Distributor': 4,
  Distributor: 5,
  Customer: 6
};

// User sign-up
exports.signUp = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      role_id,
      superior_id,
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      full_name,
      gst_number
    } = req.body;

    // Validate required fields
    if (!username || !password || !email || !role_id || !mobile_number) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Validate `role_id` and check if the role exists
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    // Check if superior_id is provided and validate it
    if (role.role_name !== 'Admin' && !superior_id) {
      return res.status(400).json({ error: 'Superior ID is required for hierarchical users' });
    }

    // Validate superior_id if provided
    if (superior_id) {
      const superiorUser = await User.findByPk(superior_id);
      if (!superiorUser) {
        return res.status(400).json({ error: 'Superior ID does not exist' });
      }

      // Ensure the superior's role is higher in hierarchy
      if (roleHierarchy[superiorUser.role_name] >= roleHierarchy[role.role_name]) {
        return res.status(400).json({ error: 'Superior must be a higher level in the hierarchy' });
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

    // Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role_id,
      superior_id: role.role_name === 'Admin' ? null : superior_id, // Set superior_id based on role
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      full_name,
      gst_number,
      role_name: role.role_name
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
        role: user.role_name // Use role_name instead of role_id
      },
      process.env.JWT_SECRET, // Ensure this is set in your .env file
      { expiresIn: '1h' } // Token expiry time
    );

    // Return the token and user details (excluding the password)
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role_name // Use role_name instead of role_id
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
























// const { User, Role } = require('../models');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { Op } = require('sequelize');

// // User sign-up
// exports.signUp = async (req, res) => {
//   try {
//     const {
//       username,
//       password,
//       email,
//       role_id,
//       superior_id,
//       pincode,
//       state,
//       city,
//       street_name,
//       building_no_name,
//       mobile_number,
//       full_name,
//       gst_number
//     } = req.body;

//     // Validate required fields
//     if (!username || !password || !email || !role_id || !mobile_number) {
//       return res.status(400).json({ error: 'All required fields must be provided' });
//     }

//     // Validate `role_id` and check if the role exists
//     const role = await Role.findByPk(role_id);
//     if (!role) {
//       return res.status(400).json({ error: 'Invalid role ID' });
//     }

//     // Check if superior_id is provided and validate it
//     if (role.role_name !== 'admin' && !superior_id) {
//       return res.status(400).json({ error: 'Superior ID is required for hierarchical users' });
//     }

//     // Validate superior_id if provided
//     if (superior_id) {
//       const superiorUser = await User.findByPk(superior_id);
//       if (!superiorUser) {
//         return res.status(400).json({ error: 'Superior ID does not exist' });
//       }
//     }

//     // Check if username, email, or mobile number already exists
//     const existingUser = await User.findOne({
//       where: {
//         [Op.or]: [
//           { username },
//           { email },
//           { mobile_number }
//         ]
//       }
//     });

//     // If an existing user is found, return specific error messages
//     if (existingUser) {
//       if (existingUser.username === username) {
//         return res.status(400).json({ error: 'Username already in use' });
//       }
//       if (existingUser.email === email) {
//         return res.status(400).json({ error: 'Email already in use' });
//       }
//       if (existingUser.mobile_number === mobile_number) {
//         return res.status(400).json({ error: 'Mobile number already in use' });
//       }
//     }

//     // Hash the password before saving it to the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = await User.create({
//       username,
//       password: hashedPassword,
//       email,
//       role_id,
//       superior_id: role.role_name === 'admin' ? null : superior_id, // Set superior_id based on role
//       pincode,
//       state,
//       city,
//       street_name,
//       building_no_name,
//       mobile_number,
//       full_name,
//       gst_number,
//       role_name: role.role_name
//     });

//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // User sign-in
// exports.signIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate required fields
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find the user by email
//     const user = await User.findOne({ where: { email } });

//     // If user not found, return an error
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     // If password is incorrect, return an error
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//         role: user.role_name // Use role_name instead of role_id
//       },
//       process.env.JWT_SECRET, // Ensure this is set in your .env file
//       { expiresIn: '1h' } // Token expiry time
//     );

//     // Return the token and user details (excluding the password)
//     res.status(200).json({
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role_name // Use role_name instead of role_id
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
