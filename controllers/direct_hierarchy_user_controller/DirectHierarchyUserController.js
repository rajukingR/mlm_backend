const { User } = require('../../models');

// Dynamic function to get users by ADO and role
exports.getUsersByADOAndRole = async (req, res) => {
  try {
    const { adoId, roleId } = req.query;
    //**  Validate ADO ID and role ID **//
    if (!adoId || !roleId) {
      return res.status(400).json({ error: 'ADO ID and role ID are required' });
    }

    //** Initialize where condition **//
    const whereCondition = {
      superior_ado: adoId,    // Check the ADO assigned
      superior_md: null,      // Ensure superior_md is null
      role_id: roleId         // Role ID is dynamic
    };

    //**  Dynamically add conditions for superior_sd and superior_d based on role ID **//
    if (roleId == 4) { 
      whereCondition.superior_sd = null; // Ensure superior_sd is null for SDs
    } else if (roleId == 5) { 
      whereCondition.superior_sd = null; // Ensure superior_sd is null for Ds
      whereCondition.superior_d = null;  // Ensure superior_d is null for Ds
    } else if (roleId == 6) { 
      whereCondition.superior_sd = null; // Ensure superior_sd is null for Cs
      whereCondition.superior_d = null;  // Ensure superior_d is null for Cs
    }

    //**  Fetch users based on ADO and role dynamically **//
    const users = await User.findAll({
      where: whereCondition
    });

    //**  Check if any users were found **//
    if (users.length === 0) {
      return res.status(404).json({ message: `No users found for ADO with role ID ${roleId}` });
    }

    //** Respond with the list of users **//
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//************ Dynamic function to get users by MD and role ***************//
exports.getUsersByMDAndRole = async (req, res) => {
  try {
    const { mdId, roleId } = req.query;

    //** Validate MD ID and role ID **//
    if (!mdId || !roleId) {
      return res.status(400).json({ error: 'MD ID and role ID are required' });
    }

    // Initialize where condition
    const whereCondition = {
      superior_md: mdId,    
      role_id: roleId     
    };

    // Dynamically add conditions for superior_sd and superior_d based on role ID
    if (roleId == 4) { 
      whereCondition.superior_sd = null; // Ensure the SD is directly under the MD
    } else if (roleId == 5) { 
      whereCondition.superior_sd = null; // Ensure Distributor is directly under the MD
      whereCondition.superior_d = null;  // Ensure Distributor is not under any other D
    } else if (roleId == 6) {
      whereCondition.superior_sd = null; // Ensure Customer is directly under the MD
      whereCondition.superior_d = null;  // Ensure Customer is not under any other D
    }

    // Fetch users based on MD and role dynamically
    const users = await User.findAll({
      where: whereCondition
    });

    // Check if any users were found
    if (users.length === 0) {
      return res.status(404).json({ message: `No users found for MD with role ID ${roleId}` });
    }

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




//************* Dynamic function to get users by SD and role *************//
exports.getUsersBySDAndRole = async (req, res) => {
  try {
    const { sdId, roleId } = req.query;

    //**  Validate SD ID and role ID **//
    if (!sdId || !roleId) {
      return res.status(400).json({ error: 'SD ID and role ID are required' });
    }

    //**  Initialize where condition **//
    const whereCondition = {
      superior_sd: sdId,    
      role_id: roleId     
    };

    // Dynamically add conditions for superior_d based on role ID
    if (roleId == 5) {
      whereCondition.superior_d = null;  // Ensure Distributor is directly under the SD
    } else if (roleId == 6) { 
      whereCondition.superior_d = null;  // Ensure Customer is directly under the SD, no D in-between
    }

    // Fetch users based on SD and role dynamically
    const users = await User.findAll({
      where: whereCondition
    });

    // Check if any users were found
    if (users.length === 0) {
      return res.status(404).json({ message: `No users found for SD with role ID ${roleId}` });
    }

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
















// const { User } = require('../../models');


// exports.getSDsByADO = async (req, res) => {
//     try {
//       const { adoId } = req.query; // Get ADO ID from query parameters
  
//       // Validate ADO ID
//       if (!adoId) {
//         return res.status(400).json({ error: 'ADO ID is required' });
//       }
  
//       // Fetch SDs created by the specified ADO
//       const sds = await User.findAll({
//         where: {
//           superior_ado: adoId,   // Check the superior_ado field
//           superior_md: null,      // Ensure superior_md is null
//           role_id: 4              // Role ID 4 corresponds to Super Distributor
//         }
//       });
  
//       // Check if any SDs were found
//       if (sds.length === 0) {
//         return res.status(404).json({ message: 'No Super Distributors found for this ADO' });
//       }
  
//       // Respond with the list of SDs
//       res.status(200).json(sds);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };


//   ///*****Get Ds by ADO********///
//   exports.getDistributorsByADO = async (req, res) => {
//     try {
//       const { adoId } = req.query;
//       if (!adoId) {
//         return res.status(400).json({ error: 'ADO ID is required' });
//       }
//       const ds = await User.findAll({
//         where: {
//           superior_ado: adoId,
//           superior_md: null,   
//           superior_sd: null,   
//           role_id: 5             
//         }
//       });
//       if (ds.length === 0) {
//         return res.status(404).json({ message: 'No Distributors found for this ADO' });
//       }
//       res.status(200).json(ds);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };


//     ///*****Get Cs by ADO********///
//     exports.getCoustomersByADO = async (req, res) => {
//         try {
//           const { adoId } = req.query;
//           if (!adoId) {
//             return res.status(400).json({ error: 'ADO ID is required' });
//           }
//           const customers = await User.findAll({
//             where: {
//               superior_ado: adoId,
//               superior_md: null,   
//               superior_sd: null,   
//               superior_d: null,   
//               role_id: 6             
//             }
//           });
//           if (customers.length === 0) {
//             return res.status(404).json({ message: 'No Coustomers found for this ADO' });
//           }
//           res.status(200).json(customers);
//         } catch (error) {
//           res.status(500).json({ error: error.message });
//         }
//       };
  