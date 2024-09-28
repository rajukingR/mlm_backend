const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');



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
      gst_number,
      superior_ado,
      superior_md,
      superior_sd,
      superior_d
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

    // Check if superior_id is provided and validate it for non-admin roles
    if (role.role_name !== 'Admin' && !superior_id) {
      return res.status(400).json({ error: 'Superior ID is required for hierarchical users' });
    }

    // Validate superior fields based on the role
    if (role.role_name === 'Master Distributor' && !superior_ado) {
      return res.status(400).json({ error: 'ADO must be assigned when creating a Master Distributor' });
    }

    if (role.role_name === 'Super Distributor' && !superior_ado) {
      return res.status(400).json({ error: 'ADO must be assigned when creating a Super Distributor' });
    }

    if (role.role_name === 'Distributor' && !superior_ado) {
      return res.status(400).json({ error: 'ADO must be assigned when creating a Distributor' });
    }

    if (role.role_name === 'Customer' && !superior_ado) {
      return res.status(400).json({ error: 'ADO must be assigned when creating a Customer' });
    }

    // Validate superior users if provided
    if (superior_ado) {
      const adoUser = await User.findByPk(superior_ado);
      if (!adoUser || adoUser.role_name !== 'Area Development Officer') {
        return res.status(400).json({ error: 'Invalid ADO ID' });
      }
    }

    if (superior_md) {
      const mdUser = await User.findByPk(superior_md);
      if (!mdUser || mdUser.role_name !== 'Master Distributor') {
        return res.status(400).json({ error: 'Invalid Master Distributor ID' });
      }
    }

    if (superior_sd) {
      const sdUser = await User.findByPk(superior_sd);
      if (!sdUser || sdUser.role_name !== 'Super Distributor') {
        return res.status(400).json({ error: 'Invalid Super Distributor ID' });
      }
    }

    if (superior_d) {
      const dUser = await User.findByPk(superior_d);
      if (!dUser || dUser.role_name !== 'Distributor') {
        return res.status(400).json({ error: 'Invalid Distributor ID' });
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
      role_name: role.role_name,
      superior_ado,
      superior_md,
      superior_sd,
      superior_d
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};









//** User Edite  API **//
// User update
// Update user information

// Optimized User Update Controller
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from request params
    const {
      username,
      password,
      email,
      role_id,
      superior_id,
      superior_ado,
      superior_md,
      superior_sd,
      superior_d,
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

    // Validate hierarchical superiors based on role_id
    if (role.role_name !== 'Admin') {
      if (!superior_id) {
        return res.status(400).json({ error: 'Superior ID is required for hierarchical users.' });
      }

      // Admin creating MD, SD, or Distributor
      if (['Master Distributor', 'Super Distributor', 'Distributor'].includes(role.role_name) && !superior_ado) {
        return res.status(400).json({ error: `Superior ADO is required for ${role.role_name}.` });
      }

      // Validate superior IDs exist in the system
      const checkSuperiors = async (superiorId, roleName) => {
        const superior = await User.findByPk(superiorId);
        if (!superior) {
          throw new Error(`Superior ${roleName} not found.`);
        }
      };

      if (superior_ado) await checkSuperiors(superior_ado, 'ADO');
      if (superior_md) await checkSuperiors(superior_md, 'MD');
      if (superior_sd) await checkSuperiors(superior_sd, 'SD');
      if (superior_d) await checkSuperiors(superior_d, 'Distributor');
    }

    // Check if username, email, or mobile number is being updated and already exists in another user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }, { mobile_number }],
        id: { [Op.ne]: userId }, // Exclude current user from the check
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
    let hashedPassword = user.password; // Keep the old password if not updating
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user details
    await user.update({
      username,
      password: hashedPassword,
      email,
      role_id,
      superior_id: role.role_name === 'Admin' ? null : superior_id, // Set superior_id only if role isn't Admin
      superior_ado,
      superior_md,
      superior_sd,
      superior_d,
      pincode,
      state,
      city,
      street_name,
      building_no_name,
      mobile_number,
      full_name,
      gst_number,
      status, // Update status if needed
      role_name: role.role_name, // Update the role name if the role_id is changed
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
        superior_ado: user.superior_ado,
        superior_md: user.superior_md,
        superior_sd: user.superior_sd,
        superior_d: user.superior_d,
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

    // Proper error response in case of server or validation failure
    return res.status(500).json({ error: error.message || 'An error occurred while updating the user.' });
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















//** User sign-in **//
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







// Admin Read API: Get all users in hierarchical forma
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







