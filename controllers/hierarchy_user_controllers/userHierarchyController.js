const { User, Role } = require('../../models');
const { Op } = require('sequelize');

// Hierarchical Get API based on the logged-in user's role
exports.getHierarchicalUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user.id; // Assuming you are storing logged-in user info in `req.user`
    
    // Get the logged-in user's role
    const loggedInUser = await User.findByPk(loggedInUserId, {
      attributes: { exclude: ['password'] }
    });

    if (!loggedInUser) {
      return res.status(404).json({ error: 'Logged in user not found' });
    }

    const roleHierarchy = {
      'Area Development Officer': ['Master Distributor', 'Super Distributor', 'Distributor', 'Customer'],
      'Master Distributor': ['Super Distributor', 'Distributor', 'Customer'],
      'Super Distributor': ['Distributor', 'Customer'],
      'Distributor': ['Customer']
    };

    // Fetch users based on the role and hierarchy
    let users;
    if (loggedInUser.role_name === 'Admin') {
      // Admin can see everyone
      users = await User.findAll({ 
        attributes: { exclude: ['password'] }
      });
    } else {
      // Get all users below the logged-in user in the hierarchy
      users = await User.findAll({
        where: {
          [Op.or]: [
            { superior_ado: loggedInUser.id },
            { superior_md: loggedInUser.id },
            { superior_sd: loggedInUser.id },
            { superior_d: loggedInUser.id }
          ]
        },
        attributes: { exclude: ['password'] },
        order: [['role_id', 'ASC']] // Sort by role hierarchy
      });
    }

    // Structure the result into nested format based on logged-in user role
    const hierarchy = buildNestedHierarchy(loggedInUser, users);

    res.status(200).json(hierarchy);
  } catch (error) {
    console.error('Error fetching hierarchical users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

// Helper function to build nested user hierarchy
function buildNestedHierarchy(loggedInUser, users) {
  const hierarchy = {
    id: loggedInUser.id,
    username: loggedInUser.username,
    role: loggedInUser.role_name,
    children: []
  };

  // Recursive function to build nested structure based on hierarchy
  const roleOrder = ['Area Development Officer', 'Master Distributor', 'Super Distributor', 'Distributor', 'Customer'];

  const createNested = (userRole, parentId, allUsers) => {
    return allUsers
      .filter(user => user[`superior_${userRole.toLowerCase().split(' ').join('_')}`] === parentId)
      .map(user => ({
        id: user.id,
        username: user.username,
        role: user.role_name,
        children: roleOrder
          .slice(roleOrder.indexOf(user.role_name) + 1)
          .reduce((acc, role) => [...acc, ...createNested(role, user.id, allUsers)], [])
      }));
  };

  hierarchy.children = roleOrder
    .slice(roleOrder.indexOf(loggedInUser.role_name) + 1)
    .reduce((acc, role) => [...acc, ...createNested(role, loggedInUser.id, users)], []);

  return hierarchy;
}
