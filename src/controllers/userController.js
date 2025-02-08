<<<<<<< HEAD:controllers/userController.js
=======
const { User, Role,DeleteRequest } = require('../../models');
const bcrypt = require('bcrypt');
>>>>>>> murugan_api2:src/controllers/userController.js
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Import the User model

// Controller function for user login
exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

<<<<<<< HEAD:controllers/userController.js
  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
=======
const encryptPassword = (password) => {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decryptPassword = (encryptedPassword) => {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};


// /////**** Signin For Web ******/
// exports.signInWeb = async (req, res) => {
  
//   try {
//     const { mobile_number, password } = req.body;

//     // Validate required fields
//     if (!mobile_number || !password) {
//       return res.status(400).json({ error: 'Mobile_number and password are required' });
//     }

//     // Find the user based on mobile number
//     const user = await User.findOne({ where: { mobile_number } });

//     // If user not found, return an error
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid mobile or password' });
//     }

//     // Check if user is in DeleteRequest with status 'Deleted'
//     const deleteRequest = await DeleteRequest.findOne({
//       where: { user_id: user.id, status: 'Deleted' },
//     });

//     if (deleteRequest) {
//       return res.status(404).json({ error: 'Your account has been deleted.' });
//     }

//     const decryptedPassword = decryptPassword(user.password);

//     // If password is incorrect, return an error
//     // if (!isPasswordValid) {
//     //   return res.status(401).json({ error: 'Invalid mobile or password' });
//     // }
//     if (password !== decryptedPassword) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       {
//         id: user.id,
//         mobile_number: user.mobile_number,
//         role: user.role_name
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '180d' }
//     );

//     // Return the token and user details (excluding the password)
//     res.status(200).json({
//       token,
//       user: {
//         id: user.id,
//         mobile_number: user.mobile_number,
//         role: user.role_name, // Use role_name instead of role_id
//         user_name: user.username,
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// /////////*************** User sign-in ******************/////////
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
//     // const isPasswordValid = await bcrypt.compare(password, user.password);


//     // Check if user is in DeleteRequest with status 'Deleted'
//     const deleteRequest = await DeleteRequest.findOne({
//       where: { user_id: user.id, status: 'Deleted' },
//     });

//     if (deleteRequest) {
//       return res.status(404).json({ error: 'Your account has been deleted.' });
//     }

    
//     const decryptedPassword = decryptPassword(user.password); 

//     // If password is incorrect, return an error
//     // if (!isPasswordValid) {
//     //   return res.status(401).json({ error: 'Invalid mobile or password' });
//     // }
//     if (password !== decryptedPassword) {
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
//       { expiresIn: '180d' } // Token expiry time
//     );

//     // Return the token and user details (excluding the password)
//     res.status(200).json({
//       token,
//       user: {
//         id: user.id,
//         mobile_number: user.mobile_number,
//         role: user.role_name, // Use role_name instead of role_id
//         user_name: user.username,
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

/////*** Signin For Web *****/
exports.signInWeb = async (req, res) => {
  
  try {
    const { mobile_number, password } = req.body;

    if (!mobile_number || !password) {
      return res.status(400).json({ error: 'Mobile_number and password are required' });
    }

    // Find the user based on mobile number
    const user = await User.findOne({ where: { mobile_number } });

    if (!user) {
      return res.status(401).json({ error: 'Mobile number not found' });
    }

    // Check if user is in DeleteRequest with status 'Deleted'
    const deleteRequest = await DeleteRequest.findOne({
      where: { user_id: user.id, status: 'Deleted' },
    });

    if (deleteRequest) {
      return res.status(404).json({ error: 'Your account has been deleted.' });
    }

    const decryptedPassword = decryptPassword(user.password);

    if (password !== decryptedPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        mobile_number: user.mobile_number,
        role: user.role_name
      },
      process.env.JWT_SECRET,
      { expiresIn: '180d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        mobile_number: user.mobile_number,
        role: user.role_name,
        user_name: user.username,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
>>>>>>> murugan_api2:src/controllers/userController.js
  }

<<<<<<< HEAD:controllers/userController.js
  try {
    // Find user by username
=======


/////////************** User sign-in *****************/////////
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
    // const isPasswordValid = await bcrypt.compare(password, user.password);


    // Check if user is in DeleteRequest with status 'Deleted'
    const deleteRequest = await DeleteRequest.findOne({
      where: { user_id: user.id, status: 'Deleted' },
    });

    if (deleteRequest) {
      return res.status(404).json({ error: 'Your account has been deleted.' });
    }

    
    const decryptedPassword = decryptPassword(user.password); 

    // If password is incorrect, return an error
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: 'Invalid mobile or password' });
    // }
    if (password !== decryptedPassword) {
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
      { expiresIn: '180d' } // Token expiry time
    );

    // Return the token and user details (excluding the password)
    res.status(200).json({
      token,
      user: {
        id: user.id,
        mobile_number: user.mobile_number,
        role: user.role_name, // Use role_name instead of role_id
        user_name: user.username,
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
      club_name,
      country,
      district
    } = req.body;

    // Extract user ID from the authentication token (Admin's ID)
    const loggedInUserId = req.user.id;  // Assuming `req.user.id` contains the logged-in user's ID from the token

    // Validate role
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    // Dynamically generate username based on role and mobile number
    let username;
    switch (role.role_name) {
      case 'Area Development Officer':
        username = `ado_${mobile_number}`;
        break;
      case 'Master Distributor':
        username = `md_${mobile_number}`;
        break;
      case 'Super Distributor':
        username = `sd_${mobile_number}`;
        break;
      case 'Distributor':
        username = `d_${mobile_number}`;
        break;
      case 'Customer':
        username = `c_${mobile_number}`;
        break;
    }

    let finalSuperiorId = superior_id;

    if (role.role_name === 'Area Development Officer') {
      // If superior_id is null or not provided, set superior_id to Admin's ID (Logged-in Admin)
      if (!superior_id) {
        finalSuperiorId = loggedInUserId;  // Use the logged-in Admin's ID
      } else {
        // Validate superior_id if provided
        const adminUser = await User.findOne({ where: { role_name: 'Admin', id: superior_id } });
        if (!adminUser) {
          return res.status(400).json({ error: 'Admin ID not valid or Admin not found' });
        }
      }
    } else {
      // Validate superior user if not ADO
      const creator = await User.findByPk(superior_id);
      if (!creator) {
        return res.status(400).json({ error: 'Invalid superior_id' });
      }
      if (creator.role_name === 'Admin') {
        return res.status(400).json({ error: 'Admin cannot be assigned as superior' });
      }

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

    // Image validation
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    if (req.file && !allowedFormats.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Only JPEG, PNG, and GIF are allowed.'
      });
    }

    // Check for existing user, email, and mobile number
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
    // const hashedPassword = await bcrypt.hash(password, 10);
    const encryptedPassword = encryptPassword(password);

    const newUser = await User.create({
      username,
      password: encryptedPassword,
      email,
      role_id,
      superior_id: finalSuperiorId,  // Use the final superior_id which is now handled correctly
      role_name: role.role_name,
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      full_name,
      gst_number,
      club_name,
      image: req.file ? req.file.filename : null,
      country,
      district
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
      club_name,
      country,
      district,
    } = req.body;

    // Validate required fields
    if (!email || !role_id || !mobile_number) {
      return res.status(400).json({
        error: 'Required fields must be provided: email, role_id, and mobile_number.',
      });
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

    // Dynamically generate username based on role and mobile number
    let username = user.username; // Default to current username
    if (mobile_number) {
      switch (role.role_name) {
        case 'Area Development Officer':
          username = `ado_${mobile_number}`;
          break;
        case 'Master Distributor':
          username = `md_${mobile_number}`;
          break;
        case 'Super Distributor':
          username = `sd_${mobile_number}`;
          break;
        case 'Distributor':
          username = `d_${mobile_number}`;
          break;
        case 'Customer':
          username = `c_${mobile_number}`;
          break;
        default:
          username = mobile_number; // Fallback username
      }
    }

    // Validate required fields for username, email, role_id, and mobile_number
    if (!username || !email || !role_id || !mobile_number) {
      return res.status(400).json({ error: 'Required fields must be provided (username, email, role_id, mobile_number).' });
    }

    // Handle superior_id validation based on the role
    let finalSuperiorId = superior_id;

    // Ensure that only the Admin or higher roles can have a superior_id
    if (role.role_name !== 'Admin' && role.role_name !== 'Area Development Officer' && !superior_id) {
      return res.status(400).json({ error: 'Superior ID is required for hierarchical users.' });
    }

    // If role is 'Area Development Officer', ensure the superior_id is either Admin or a valid supervisor
    if (role.role_name === 'Area Development Officer') {
      if (!superior_id) {
        finalSuperiorId = loggedInUserId; // Use the logged-in Admin's ID
      } else {
        // Validate superior_id if provided
        const adminUser = await User.findOne({ where: { role_name: 'Admin', id: superior_id } });
        if (!adminUser) {
          return res.status(400).json({ error: 'Admin ID not valid or Admin not found.' });
        }
      }
    }

    // Check if superior_id is provided and ensure it belongs to a valid user
    if (superior_id) {
      const superiorUser = await User.findByPk(superior_id);
      if (!superiorUser) {
        return res.status(400).json({ error: 'Superior user not found.' });
      }

      // Ensure that Admin is not assigned as a superior for certain roles
      if (superiorUser.role_name === 'Admin') {
        // Admin can supervise only specific roles
        const allowedRolesForAdmin = ['Area Development Officer', 'Master Distributor', 'Super Distributor'];
        if (!allowedRolesForAdmin.includes(role.role_name)) {
          return res.status(400).json({ error: 'Invalid superior ID; Admin cannot supervise this role.' });
        }
      } else {
        // Other regular roles should follow the role hierarchy
        const roleHierarchy = {
          1: ['2', '3', '4', '5', '6'],  // Admin can supervise all roles
          2: ['3', '4', '5', '6'],        // Area Development Officer can supervise lower roles
          3: ['4', '5', '6'],             // Master Distributor can supervise certain lower roles
          4: ['5', '6'],                  // Super Distributor can supervise Distributor and Customer
          5: ['6'],                       // Distributor can only supervise Customer
          6: [],                          // Customer cannot supervise anyone
        };

        const allowedRoles = roleHierarchy[superiorUser.role_id];
        if (!allowedRoles.includes(role_id.toString())) {
          return res.status(400).json({ error: 'Superior user role cannot supervise this role.' });
        }
      }
    }

    // Check for unique username, email, and mobile_number
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

    // Hash the password if provided
    // let hashedPassword = user.password;
    // if (password) {
    //   hashedPassword = await bcrypt.hash(password, 10);
    // }
    let encryptedPassword = user.password; // Use the existing encrypted password
    if (password) {
      encryptedPassword = encryptPassword(password);
    }

    // Validate and process image file (if provided)
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    let imageFilename = user.image;
    if (req.file) {
      if (!allowedFormats.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid image format. Only JPEG, PNG, and GIF are allowed.',
        });
      }

      if (req.file.size > 2 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: 'Image size exceeds 2MB limit.',
        });
      }

      imageFilename = req.file.filename;
    }

    // Update user with new data
    await user.update({
      username,
      // password: hashedPassword,
      password: encryptedPassword,
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
      club_name,
      role_name: role.role_name,
      image: imageFilename,
      country,
      district,
    });

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
        club_name: user.club_name,
        image: user.image,
        country: user.country,
        district: user.district,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error.message);
    return res.status(500).json({ error: error.message || 'An error occurred while updating the user.' });
  }
};



exports.getUserById = async (req, res) => {
  try {
    const { userID } = req.params; // Correctly extract the parameter

    // Validate that userID is provided
    if (!userID) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch the user by ID
>>>>>>> murugan_api2:src/controllers/userController.js
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
<<<<<<< HEAD:controllers/userController.js
      token: token, 

=======
      attributes: ['id','role_id','username','image', 'full_name', 'role_name', 'city'],
    });
    const mdCount = mdUsers.length;

    // Fetch details for SDs (Super Distributors) along with their counts
    const sdUsers = await User.findAll({
      where: {
        ...conditions,
        role_name: 'Super Distributor',
      },
      attributes: ['id','role_id','username','image', 'full_name', 'role_name', 'city'],
    });
    const sdCount = sdUsers.length;

    // Fetch details for Distributors along with their counts
    const distributorUsers = await User.findAll({
      where: {
        ...conditions,
        role_name: 'Distributor',
      },
      attributes: ['id','role_id','username','image', 'full_name', 'role_name', 'city'],
    });
    const distributorCount = distributorUsers.length;

    // Fetch details for Customers along with their counts
    const customerUsers = await User.findAll({
      where: {
        ...conditions,
        role_name: 'Customer',
      },
      attributes: ['id','role_id','username','image', 'full_name', 'role_name', 'city'],
    });
    const customerCount = customerUsers.length;

    // Fetch details for ADOs (Area Development Officers) along with their counts
    const adoUsers = await User.findAll({
      where: {
        ...conditions,
        role_name: 'Area Development Officer',
      },
      attributes: ['id','role_id','username','image', 'full_name', 'role_name', 'city'],
    });
    const adoCount = adoUsers.length;

    return res.json({
      mdCount,
      mdUsers,
      sdCount,
      sdUsers,
      distributorCount,
      distributorUsers,
      customerCount,
      customerUsers,
      adoCount,
      adoUsers,
>>>>>>> murugan_api2:src/controllers/userController.js
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
};
