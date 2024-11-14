const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');



/////////*************** User sign-in ******************/////////
exports.signIn = async (req, res) => {
  try {
    const { mobile_number, password } = req.body;

    // Validate required fields
    if (!mobile_number || !password) {
      return res.status(400).json({ error: 'Mobile_number and password are required' });
    }

    // Find the user by mobile
    const user = await User.findOne({ where: { mobile_number } });

    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid mobile or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is incorrect, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid mobile or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        mobile_number: user.mobile_number,
        role: user.role_name // Use role_name instead of role_id
      },
      process.env.JWT_SECRET, // Ensure this is set in your .env file
      { expiresIn: '10h' } // Token expiry time
    );

    // Return the token and user details (excluding the password)
    res.status(200).json({
      token,
      user: {
        id: user.id,
        mobile_number: user.mobile_number,
        role: user.role_name // Use role_name instead of role_id
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


///// ************************User sign-up***********************************/////
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

//     // Validate role
//     const role = await Role.findByPk(role_id);
//     if (!role) {
//       return res.status(400).json({ error: 'Invalid role ID' });
//     }

//     // Validate superior user (creator)
//     const roleHierarchy = {
//       1: ['2', '3', '4', '5', '6'],
//       2: ['3', '4', '5', '6'],
//       3: ['4', '5', '6'],
//       4: ['5', '6'],
//       5: ['6'],
//       6: []
//     };

//     const creator = await User.findByPk(superior_id);
//     if (!creator) {
//       return res.status(400).json({ error: 'Invalid superior_id' });
//     }

//     // Ensure Admin cannot be assigned as a superior for hierarchical users
//     if (creator.role_name === 'Admin') {
//       return res.status(400).json({ error: 'Admin cannot be assigned as superior' });
//     }

//     const allowedRoles = roleHierarchy[creator.role_id];
//     if (!allowedRoles.includes(role_id.toString())) {
//       return res.status(400).json({ error: 'Superior user role cannot supervise this role' });
//     }

//     // Check for existing username, email, and mobile number
//     const [existingUser, existingEmail, existingMobile] = await Promise.all([
//       User.findOne({ where: { username } }),
//       User.findOne({ where: { email } }),
//       User.findOne({ where: { mobile_number } })
//     ]);

//     if (existingUser || existingEmail || existingMobile) {
//       const errorMessages = [];
//       if (existingUser) errorMessages.push('Username already exists');
//       if (existingEmail) errorMessages.push('Email already exists');
//       if (existingMobile) errorMessages.push('Mobile number already exists');
//       return res.status(400).json({ error: errorMessages.join(', ') });
//     }

//     // Create the user after validation passes
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       username,
//       password: hashedPassword,
//       email,
//       role_id,
//       superior_id,
//       role_name: role.role_name,
//       pincode,
//       state,
//       city,
//       street_name,
//       building_no_name,
//       mobile_number,
//       full_name,
//       gst_number
//     });

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// };

exports.signUp = async (req, res) => {
  try {
    const {
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
      gst_number,
      club_id,  
      // image
    } = req.body;

    // Validate role
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

        // Dynamically generate username based on role and mobile number
        let username;
          if (role.role_name === 'Area Development Officer') {
          username = `ado_${mobile_number}`;
        } else if (role.role_name === 'Master Distributor') {
          username = `md_${mobile_number}`;
        } else if (role.role_name === 'Super Distributor') {
          username = `sd_${mobile_number}`;
        } else if (role.role_name === 'Distributor') {
          username = `d_${mobile_number}`;
        } else if (role.role_name === 'Customer') {
          username = `c_${mobile_number}`;
        }

    // Check if the role is ADO (assuming 'ADO' is the name in your roles table)
    let finalSuperiorId = superior_id;
    if (role.role_name === 'Area Development Officer') {
      finalSuperiorId = null;
    } else {
      // Validate superior user if not ADO
      const creator = await User.findByPk(superior_id);
      if (!creator) {
        return res.status(400).json({ error: 'Invalid superior_id' });
      }

      // Ensure Admin cannot be assigned as a superior for hierarchical users
      if (creator.role_name === 'Admin') {
        return res.status(400).json({ error: 'Admin cannot be assigned as superior' });
      }

      // Define role hierarchy and validate based on it
      const roleHierarchy = {
        1: ['2', '3', '4', '5', '6'],
        2: ['3', '4', '5', '6'],
        3: ['4', '5', '6'],
        4: ['5', '6'],
        5: ['6'],
        6: []
      };
      const allowedRoles = roleHierarchy[creator.role_id];
      if (!allowedRoles.includes(role_id.toString())) {
        return res.status(400).json({ error: 'Superior user role cannot supervise this role' });
      }
    }

    // Image format validation
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    if (req.file && !allowedFormats.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Only JPEG, PNG, and GIF are allowed.',
      });
    }

    // Check for existing username, email, and mobile number
    const [existingUser, existingEmail, existingMobile] = await Promise.all([ 
      User.findOne({ where: { username } }),
      User.findOne({ where: { email } }),
      User.findOne({ where: { mobile_number } })
    ]);

    if (existingUser || existingEmail || existingMobile) {
      const errorMessages = [];
      if (existingUser) errorMessages.push('Username already exists');
      if (existingEmail) errorMessages.push('Email already exists');
      if (existingMobile) errorMessages.push('Mobile number already exists');
      return res.status(400).json({ error: errorMessages.join(', ') });
    }

    // Create the user after validation passes
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role_id,
      superior_id: finalSuperiorId,
      role_name: role.role_name,
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      full_name,
      gst_number,
      club_id, 
      image: req.file ? req.file.filename : null 
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};



////////////***************** Optimized User Update Controller   ***********/////////////
// Optimized User Update Controller
// Optimized User Update Controller
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
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
      gst_number,
      status,
      club_id // Added club_id
    } = req.body;

    // Validate required fields
    if (!username || !email || !role_id || !mobile_number) {
      return res.status(400).json({ error: 'Required fields must be provided (username, email, role_id, mobile_number).' });
    }

    // Find the user being updated
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Validate `role_id` and check if the role exists
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ error: 'Invalid role ID.' });
    }

    // Check if superior_id is valid and its role can supervise the current role
    // if (role.role_name !== 'Admin' && !superior_id) {
    //   return res.status(400).json({ error: 'Superior ID is required for hierarchical users.' });
    // }
    if (role.role_name !== 'Admin' && role.role_name !== 'Area Development Officer' && !superior_id) {
      return res.status(400).json({ error: 'Superior ID is required for hierarchical users.' });
    }
    

    // If superior_id is provided, check if it's a valid user and their role allows them to supervise
    if (superior_id) {
      const superiorUser = await User.findByPk(superior_id);
      if (!superiorUser || superiorUser.role_name === 'Admin') {
        return res.status(400).json({ error: 'Invalid superior ID; cannot assign Admin as a superior.' });
      }

      // Define the allowed role hierarchy for each role
      const roleHierarchy = {
        1: ['2', '3', '4', '5', '6'],  // Admin can supervise any role
        2: ['3', '4', '5', '6'],        // Role 2 can supervise Roles 3, 4, 5, 6
        3: ['4', '5', '6'],             // Role 3 can supervise Roles 4, 5, 6
        4: ['5', '6'],                  // Role 4 can supervise Roles 5, 6
        5: ['6'],                       // Role 5 can supervise Role 6
        6: []                           // Role 6 cannot supervise anyone
      };

      // Check if superior's role can supervise the new role
      const allowedRoles = roleHierarchy[superiorUser.role_id];
      if (!allowedRoles.includes(role_id.toString())) {
        return res.status(400).json({ error: 'Superior user role cannot supervise this role.' });
      }
    }

    // Check if username, email, or mobile number is being updated and already exists in another user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }, { mobile_number }],
        id: { [Op.ne]: userId },
      },
    });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already in use.' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
      if (existingUser.mobile_number === mobile_number) {
        return res.status(400).json({ error: 'Mobile number already in use.' });
      }
    }

    // Hash the password if it's being updated
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Image format validation
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    let imageFilename = user.image; // Keep current image if no new one is uploaded
    if (req.file) {
      if (!allowedFormats.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid image format. Only JPEG, PNG, and GIF are allowed.',
        });
      }
      imageFilename = req.file.filename; // Use the new uploaded image
    }
    const finalSuperiorId = role.role_name === 'Area Development Officer' ? null : superior_id;
    // Update user details
    await user.update({
      username,
      password: hashedPassword,
      email,
      role_id,
      superior_id: finalSuperiorId,
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      full_name,
      gst_number,
      status,
      club_id, // Save club_id
      role_name: role.role_name,
      image: imageFilename, // Save the new image filename if provided
    });

    // Success response
    return res.status(200).json({
      message: 'User updated successfully.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        role_name: role.role_name,
        superior_id: user.superior_id,
        pincode: user.pincode,
        state: user.state,
        city: user.city,
        street_name: user.street_name,
        building_no_name: user.building_no_name,
        mobile_number: user.mobile_number,
        full_name: user.full_name,
        gst_number: user.gst_number,
        status: user.status,
        club_id: user.club_id, // Include club_id in response
        image: user.image, // Include image in response
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error.message);
    return res.status(500).json({ error: error.message || 'An error occurred while updating the user.' });
  }
};


// Admin Read API: Get all users in hierarchical format
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    // Structure users into hierarchy
    const userHierarchy = {};
    users.forEach(user => {
      const role = user.role_name;
      if (!userHierarchy[role]) {
        userHierarchy[role] = [];
      }
      userHierarchy[role].push(user);
    });

    // Build a structured response
    const response = {
      Admins: userHierarchy.Admin || [],
      ADOs: userHierarchy['Area Development Officer'] || [],
      MDs: userHierarchy['Master Distributor'] || [],
      SDs: userHierarchy['Super Distributor'] || [],
      Ds: userHierarchy.Distributor || [],
      Cs: userHierarchy.Customer || [],
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

// API to get users by role
exports.getUsersByRole = async (req, res) => {
  try {
    const { role_id } = req.query;

    // Validate role_id
    if (!role_id) {
      return res.status(400).json({ error: 'Role ID is required' });
    }

    // Check if the role exists in the roles table
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ error: 'Invalid Role ID' });
    }

    // Fetch users with the provided role_id
    const users = await User.findAll({
      where: { role_id },
      attributes: ['id', 'username', 'mobile_number', 'email', 'full_name', 'role_id', 'role_name', 'superior_id', 'image']
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for the given role' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from request params

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Perform deletion
    await User.destroy({ where: { id: userId } });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};