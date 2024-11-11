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

    // Validate role
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ error: 'Invalid role ID' });
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
      superior_id: finalSuperiorId, // Use finalSuperiorId here
      role_name: role.role_name,
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      full_name,
      gst_number
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
      status
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
    if (role.role_name !== 'Admin' && !superior_id) {
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

    // Update user details
    await user.update({
      username,
      password: hashedPassword,
      email,
      role_id,
      superior_id: role.role_name === 'Admin' ? null : superior_id,
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      full_name,
      gst_number,
      status,
      role_name: role.role_name,
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
      attributes: ['id', 'username', 'mobile_number', 'email', 'full_name', 'role_id', 'role_name', 'superior_id']
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
//       superior_ado,
//       superior_md,
//       superior_sd,
//       superior_d,
//       pincode,
//       state,
//       city,
//       street_name,
//       building_no_name,
//       mobile_number,
//       full_name,
//       gst_number,
//     } = req.body;

//     // Validate role
//     const role = await Role.findByPk(role_id);
//     if (!role) {
//       return res.status(400).json({ error: 'Invalid role ID' });
//     }

//     // Validate superior user (creator)
//     //////////////////////////////////
//     const roleHierarchy = {
//       1: ['2', '3', '4', '5', '6'],
//       2: ['3', '4', '5', '6'],    
//       3: ['4', '5', '6'],          
//       4: ['5', '6'],               
//       5: ['6'],               
//       6: []                   
//   };
//   // const superior = await getUserById(superior_id);
//   const creator = await User.findByPk(superior_id);
//   if (!creator) {
//     return res.status(400).json({ error: 'Invalid superior_id' });
//    }
//    const allowedRoles = roleHierarchy[creator.role_id]; 
//        // Check if the new user's role is allowed under the superior's role
//        if (!allowedRoles.includes(role_id.toString())) {
//         return res.status(400).json({ error: 'Superior user role cannot supervise this role' });
//   }

//     // const creator = await User.findByPk(superior_id);
//     // if (!creator) {
//     //   return res.status(400).json({ error: 'Invalid superior ID' });
//     // }

//     const creatorRole = creator.role_name;

//     // Check for existing username
//     const existingUser = await User.findOne({ where: { username } });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }

//     // Check for existing email
//     const existingEmail = await User.findOne({ where: { email } });
//     if (existingEmail) {
//       return res.status(400).json({ error: 'Email already exists' });
//     }

//     // Check for existing mobile number
//     const existingMobile = await User.findOne({ where: { mobile_number } });
//     if (existingMobile) {
//       return res.status(400).json({ error: 'Mobile number already exists' });
//     }

//     // Admin hierarchy validation
//     if (creatorRole === 'Admin') {
//       // Admin can create ADO
//       if (role.role_name === 'Area Development Officer') {
//         if (superior_ado !== null || superior_md !== null || superior_sd !== null || superior_d !== null) {
//           return res.status(400).json({ error: 'All superior fields must be null when creating an ADO' });
//         }
//       }
//       // Admin can create MD
//       else if (role.role_name === 'Master Distributor') {
//         if (!superior_ado) {
//           return res.status(400).json({ error: 'Superior ADO is required when creating an MD' });
//         }
//         if (superior_md !== null || superior_sd !== null || superior_d !== null) {
//           return res.status(400).json({ error: 'Other superior fields must be null when creating an MD' });
//         }
//       }
//       // Admin can create SD
//       else if (role.role_name === 'Super Distributor') {
//         if (!superior_ado) {
//           return res.status(400).json({ error: 'Superior ADO is required when creating an SD' });
//         }
//         if (superior_md === null) {
//           // SD can be created without superior_md
//         }
//         if (superior_sd !== null || superior_d !== null) {
//           return res.status(400).json({ error: 'Other superior fields must be null when creating an SD' });
//         }
//       }
//       // Admin can create Distributor
//       else if (role.role_name === 'Distributor') {
//         if (!superior_ado) {
//           return res.status(400).json({ error: 'Superior ADO is required when creating a Distributor' });
//         }
//         if (superior_d !== null) {
//           return res.status(400).json({ error: 'Superior D must be null when creating a Distributor' });
//         }
//       }
//       // Admin can create Customer
//       else if (role.role_name === 'Customer') {
//         if (!superior_ado) {
//           return res.status(400).json({ error: 'Superior ADO is required when creating a Customer' });
//         }
//         // Other superior fields are optional
//       }
//     }

//     // ADO hierarchy validation
//     else if (creatorRole === 'Area Development Officer') {
//       // ADO can create MD
//       if (role.role_name === 'Master Distributor') {
//         if (superior_ado !== creator.id) {
//           return res.status(400).json({ error: 'Superior ADO must be the ADO creating the MD' });
//         }
//         if (superior_md !== null || superior_sd !== null || superior_d !== null) {
//           return res.status(400).json({ error: 'Other superior fields must be null when creating an MD' });
//         }
//       }
//       // ADO can create SD
//       else if (role.role_name === 'Super Distributor') {
//         if (superior_ado !== creator.id) {
//           return res.status(400).json({ error: 'Superior ADO must be the ADO creating the SD' });
//         }
//         if (superior_md === null) {
//           // SD can be created without superior_md
//         }
//         if (superior_sd !== null || superior_d !== null) {
//           return res.status(400).json({ error: 'Other superior fields must be null when creating an SD' });
//         }
//       }
//       // ADO can create Distributor
//       else if (role.role_name === 'Distributor') {
//         if (superior_ado !== creator.id) {
//           return res.status(400).json({ error: 'Superior ADO must be the ADO creating the Distributor' });
//         }
//         if (superior_d !== null) {
//           return res.status(400).json({ error: 'Superior D must be null when creating a Distributor' });
//         }
//       }
//       // ADO can create Customer
//       else if (role.role_name === 'Customer') {
//         if (superior_ado !== creator.id) {
//           return res.status(400).json({ error: 'Superior ADO must be the ADO creating the Customer' });
//         }
//         // Other superior fields are optional
//       }
//     }

//     // MD hierarchy validation
//     else if (creatorRole === 'Master Distributor') {
//       // MD can create SD
//       if (role.role_name === 'Super Distributor') {
//         if (superior_ado !== null) {
//           return res.status(400).json({ error: 'Superior ADO must be null when creating an SD' });
//         }
//         if (!superior_md) {
//           return res.status(400).json({ error: 'Superior MD is required when creating an SD' });
//         }
//         if (superior_sd !== null || superior_d !== null) {
//           return res.status(400).json({ error: 'Other superior fields must be null when creating an SD' });
//         }
//       }
//       // MD can create Distributor
//       else if (role.role_name === 'Distributor') {
//         if (superior_ado !== null) {
//           return res.status(400).json({ error: 'Superior ADO must be null when creating a Distributor' });
//         }
//         if (!superior_md) {
//           return res.status(400).json({ error: 'Superior MD is required when creating a Distributor' });
//         }
//         // if (superior_sd !== null || superior_d !== null) {
//           if (superior_d !== null) {
//           return res.status(400).json({ error: 'Superior Distributor must be null when creating a Distributor' });
//         }
//       }
//       // MD can create Customer
//       else if (role.role_name === 'Customer') {
//         if (superior_ado !== null) {
//           return res.status(400).json({ error: 'Superior ADO must be null when creating a Customer' });
//         }
//         if (!superior_md) {
//           return res.status(400).json({ error: 'Superior MD is required when creating a Customer' });
//         }
//       }
//     }

//     // SD hierarchy validation
//     else if (creatorRole === 'Super Distributor') {
//       // SD can create Distributor
//       if (role.role_name === 'Distributor') {
//         if (superior_ado !== null || superior_md !== null || superior_sd !== creator.id) {
//           return res.status(400).json({ error: 'Superior SD is required when creating a Distributor' });
//         }
//         if (superior_d !== null) {
//           return res.status(400).json({ error: 'Superior D must be null when creating a Distributor' });
//         }
//       }
//       // SD can create Customer
//       else if (role.role_name === 'Customer') {
//         if (superior_ado !== null || superior_md !== null || superior_sd !== creator.id) {
//           return res.status(400).json({ error: 'Superior SD only asignable high hierarchy' });
//         }
//         // Other superior fields are optional
//       }
//     }

//     // D hierarchy validation
//     else if (creatorRole === 'Distributor') {
//       // D can create Customer
//       if (role.role_name === 'Customer') {
//         if (superior_ado !== null || superior_md !== null || superior_sd !== null || superior_d !== creator.id) {
//           return res.status(400).json({ error: 'Superior D is required when creating a Customer' });
//         }
//       }
//     }

//     // Prevent assigning a superior with the same role
//     if (creatorRole === role.role_name) {
//       return res.status(400).json({ error: 'A user cannot have a superior with the same role' });
//     }

//     /// ***************** Check if the superior ADO exists *************** ///

//     if (superior_ado) {
//       const ado = await User.findByPk(superior_ado);
//       if (!ado) {
//         return res.status(400).json({ error: 'Invalid superior ADO ID' });
//       }
//     }

//     // Check if the superior MD exists
//     if (superior_md) {
//       const md = await User.findByPk(superior_md);
//       if (!md) {
//         return res.status(400).json({ error: 'Invalid superior MD ID' });
//       }
//     }

//     // Check if the superior SD exists
//     if (superior_sd) {
//       const sd = await User.findByPk(superior_sd);
//       if (!sd) {
//         return res.status(400).json({ error: 'Invalid superior SD ID' });
//       }
//     }

//     // Check if the superior D exists
//     if (superior_d) {
//       const d = await User.findByPk(superior_d);
//       if (!d) {
//         return res.status(400).json({ error: 'Invalid superior D ID' });
//       }
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
//       gst_number,
//       superior_ado,
//       superior_md,
//       superior_sd,
//       superior_d,
//     });

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// };








// //** User Edite  API **//
// // User update
// // Update user information

// // Optimized User Update Controller
// exports.updateUser = async (req, res) => {
//   try {
//     const { userId } = req.params; // Get the user ID from request params
//     const {
//       username,
//       password,
//       email,
//       role_id,
//       superior_id,
//       superior_ado,
//       superior_md,
//       superior_sd,
//       superior_d,
//       pincode,
//       state,
//       city,
//       street_name,
//       building_no_name,
//       mobile_number,
//       full_name,
//       gst_number,
//       status
//     } = req.body;

//     // Validate required fields
//     if (!username || !email || !role_id || !mobile_number) {
//       return res.status(400).json({ error: 'Required fields must be provided (username, email, role_id, mobile_number).' });
//     }

//     // Find the user being updated
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     // Validate `role_id` and check if the role exists
//     const role = await Role.findByPk(role_id);
//     if (!role) {
//       return res.status(400).json({ error: 'Invalid role ID.' });
//     }

//     // Validate hierarchical superiors based on role_id
//     if (role.role_name !== 'Admin') {
//       if (!superior_id) {
//         return res.status(400).json({ error: 'Superior ID is required for hierarchical users.' });
//       }

//       // Admin creating MD, SD, or Distributor
//       if (['Master Distributor', 'Super Distributor', 'Distributor'].includes(role.role_name) && !superior_ado) {
//         return res.status(400).json({ error: `Superior ADO is required for ${role.role_name}.` });
//       }

//       // Validate superior IDs exist in the system
//       const checkSuperiors = async (superiorId, roleName) => {
//         const superior = await User.findByPk(superiorId);
//         if (!superior) {
//           throw new Error(`Superior ${roleName} not found.`);
//         }
//       };

//       if (superior_ado) await checkSuperiors(superior_ado, 'ADO');
//       if (superior_md) await checkSuperiors(superior_md, 'MD');
//       if (superior_sd) await checkSuperiors(superior_sd, 'SD');
//       if (superior_d) await checkSuperiors(superior_d, 'Distributor');
//     }

//     // Check if username, email, or mobile number is being updated and already exists in another user
//     const existingUser = await User.findOne({
//       where: {
//         [Op.or]: [{ username }, { email }, { mobile_number }],
//         id: { [Op.ne]: userId }, // Exclude current user from the check
//       },
//     });
//     if (existingUser) {
//       if (existingUser.username === username) {
//         return res.status(400).json({ error: 'Username already in use.' });
//       }
//       if (existingUser.email === email) {
//         return res.status(400).json({ error: 'Email already in use.' });
//       }
//       if (existingUser.mobile_number === mobile_number) {
//         return res.status(400).json({ error: 'Mobile number already in use.' });
//       }
//     }

//     // Hash the password if it's being updated
//     let hashedPassword = user.password; // Keep the old password if not updating
//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     // Update user details
//     await user.update({
//       username,
//       password: hashedPassword,
//       email,
//       role_id,
//       superior_id: role.role_name === 'Admin' ? null : superior_id, // Set superior_id only if role isn't Admin
//       superior_ado,
//       superior_md,
//       superior_sd,
//       superior_d,
//       pincode,
//       state,
//       city,
//       street_name,
//       building_no_name,
//       mobile_number,
//       full_name,
//       gst_number,
//       status, // Update status if needed
//       role_name: role.role_name, // Update the role name if the role_id is changed
//     });

//     // Success response
//     return res.status(200).json({
//       message: 'User updated successfully.',
//       user: {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         role_id: user.role_id,
//         role_name: role.role_name,
//         superior_id: user.superior_id,
//         superior_ado: user.superior_ado,
//         superior_md: user.superior_md,
//         superior_sd: user.superior_sd,
//         superior_d: user.superior_d,
//         pincode: user.pincode,
//         state: user.state,
//         city: user.city,
//         street_name: user.street_name,
//         building_no_name: user.building_no_name,
//         mobile_number: user.mobile_number,
//         full_name: user.full_name,
//         gst_number: user.gst_number,
//         status: user.status,
//         updatedAt: user.updatedAt,
//       },
//     });
//   } catch (error) {
//     console.error('Error updating user:', error.message);

//     // Proper error response in case of server or validation failure
//     return res.status(500).json({ error: error.message || 'An error occurred while updating the user.' });
//   }
// };


// // Delete a user
// exports.deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.params; // Get the user ID from request params

//     // Check if the user exists
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Perform deletion
//     await User.destroy({ where: { id: userId } });

//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ error: 'An error occurred while deleting the user' });
//   }
// };















// //** User sign-in **//
// exports.signIn = async (req, res) => {
//   try {
//     const { mobile_number, password } = req.body;

//     // Validate required fields
//     if (!mobile_number || !password) {
//       return res.status(400).json({ error: 'Mobile_number and password are required' });
//     }

//     // Find the user by mobile
//     const user = await User.findOne({ where: { mobile_number } });

//     // If user not found, return an error
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid mobile or password' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     // If password is incorrect, return an error
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid mobile or password' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       {
//         id: user.id,
//         mobile_number: user.mobile_number,
//         role: user.role_name // Use role_name instead of role_id
//       },
//       process.env.JWT_SECRET, // Ensure this is set in your .env file
//       { expiresIn: '10h' } // Token expiry time
//     );

//     // Return the token and user details (excluding the password)
//     res.status(200).json({
//       token,
//       user: {
//         id: user.id,
//         mobile_number: user.mobile_number,
//         role: user.role_name // Use role_name instead of role_id
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };







// // Admin Read API: Get all users in hierarchical forma
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       attributes: { exclude: ['password'] },
//     });
//     // Structure users into hierarchy
//     const userHierarchy = {};
//     users.forEach(user => {
//       const role = user.role_name;
//       if (!userHierarchy[role]) {
//         userHierarchy[role] = [];
//       }
//       userHierarchy[role].push(user);
//     });

//     // Build a structured response
//     const response = {
//       Admins: userHierarchy.Admin || [],
//       ADOs: userHierarchy['Area Development Officer'] || [],
//       MDs: userHierarchy['Master Distributor'] || [],
//       SDs: userHierarchy['Super Distributor'] || [],
//       Ds: userHierarchy.Distributor || [],
//       Cs: userHierarchy.Customer || [],
//     };

//     res.status(200).json(response);
//   } catch (error) {
//     console.error('Error fetching all users:', error);
//     res.status(500).json({ error: 'An error occurred while fetching users' });
//   }
// };





// exports.getUsersByRole = async (req, res) => {
//   try {
//     const { role_id } = req.query; // Get role_id from query parameter

//     // Validate role_id
//     if (!role_id) {
//       return res.status(400).json({ error: 'Role ID is required' });
//     }

//     // Check if the role exists in the roles table
//     const role = await Role.findByPk(role_id);
//     if (!role) {
//       return res.status(400).json({ error: 'Invalid Role ID' });
//     }

//     // Fetch users with the provided role_id
//     const users = await User.findAll({
//       where: { role_id }, // Match role_id in the users table
//       attributes: ['id', 'username', 'mobile_number', 'email', 'full_name', 'role_id', 'role_name', 'superior_ado', 'superior_md', 'superior_sd', 'superior_d'] // Specify fields you want to return
//     });

//     // If no users are found, return a message
//     if (users.length === 0) {
//       return res.status(404).json({ message: 'No users found for the given role' });
//     }

//     // Return the list of users
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };






