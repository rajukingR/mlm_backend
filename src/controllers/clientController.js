const { Client, User } = require('../models');

// Create a new client
exports.createClient = async (req, res) => {
  const {
    clientId,
    clientBrand,
    firstName,
    lastName,
    mobileNumber,
    email,
    username,
    loginId,
    password,
    country,
    state,
    city,
    street,
    landmark,
    pincode,
    status,
  } = req.body;

  try {
    const userRoleId = req.user.role_id;  
    
    let role_id = 2; 

    if (userRoleId === 1) {
      role_id = 2;  
    }

    const clientStatus = status === 'true' || status === true ? 1 : 0;

    const image = req.files && req.files['image'] ? req.files['image'][0].filename : null;

    const client = await Client.create({
      clientId,
      clientBrand,
      firstName,
      lastName,
      mobileNumber,
      email,
      loginId,
      password, 
      country,
      state,
      username,
      city,
      street,
      landmark,
      pincode,
      image,        
      status: clientStatus,
      role_id: role_id,  
      higher_role_id: userRoleId, 
    });

    const role_names = 'Client';

    const user = await User.create({
      username: username,  
      password: password,  
      role_id: role_id,   
      mobile_number: mobileNumber,  
      role_name: role_names,
    });

    // Prepare the response with the new client data
    const responseData = {
      clientId: client.clientId,
      clientBrand: client.clientBrand,
      firstName: client.firstName,
      lastName: client.lastName,
      mobileNumber: client.mobileNumber,
      email: client.email,
      loginId: client.loginId,
      country: client.country,
      state: client.state,
      city: client.city,
      street: client.street,
      landmark: client.landmark,
      pincode: client.pincode,
      status: client.status, 
      image: client.image,  
      role_id: client.role_id,
      higher_role_id: client.higher_role_id,
      user: {
        username: user.username,  
        role_id: user.role_id,   
        role_name: user.role_name, 
      }
    };

    // Return a success response
    return res.status(201).json({
      success: true,
      message: 'Client and User created successfully.',
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while creating the client.',
    });
  }
};






// Update an existing client
exports.updateClient = async (req, res) => {
  const { id } = req.params; 
  const {
    clientBrand,
    firstName,
    lastName,
    mobileNumber,
    email,
    loginId,
    password,
    country,
    state,
    city,
    street,
    landmark,
    pincode,
    status,
  } = req.body;

  try {
    // Find the client by id
    const client = await Client.findOne({ where: { id } });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found.',
      });
    }

    // Update status: Convert to boolean and then to 1 or 0 (1 for active, 0 for inactive)
    const clientStatus = status === 'true' || status === true ? 1 : 0;

    // Extract image file if it is provided in the request
    const image = req.files && req.files['image'] ? req.files['image'][0].filename : null;

    // Update the client entry in the database
    await client.update({
      clientBrand,
      firstName,
      lastName,
      mobileNumber,
      email,
      loginId,
      password,
      country,
      state,
      city,
      street,
      landmark,
      pincode,
      image: image || client.image, // Keep the existing image if not updated
      status: clientStatus, // Update the client status
    });

    // Prepare the response with updated client data
    const updatedData = {
      id: client.id,  // Use id instead of clientId
      clientBrand: client.clientBrand,
      firstName: client.firstName,
      lastName: client.lastName,
      mobileNumber: client.mobileNumber,
      email: client.email,
      loginId: client.loginId,
      country: client.country,
      state: client.state,
      city: client.city,
      street: client.street,
      landmark: client.landmark,
      pincode: client.pincode,
      status: client.status,
      image: client.image, // Updated image filename
    };

    return res.status(200).json({
      success: true,
      message: 'Client updated successfully.',
      data: updatedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the client.',
    });
  }
};



exports.getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the client by 'id'
    const client = await Client.findByPk(id);  // Using Sequelize to find by primary key (id)

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found.',
      });
    }

    // Prepare the response with client data
    const responseData = {
      id: client.id,            // Client's primary key
      clientBrand: client.clientBrand,
      firstName: client.firstName,
      lastName: client.lastName,
      mobileNumber: client.mobileNumber,
      email: client.email,
      password:client.password,
      loginId: client.loginId,
      country: client.country,
      state: client.state,
      city: client.city,
      street: client.street,
      landmark: client.landmark,
      pincode: client.pincode,
      status: client.status,  // Client status (active or inactive)
      image: client.image,    // Image filename
    };

    return res.status(200).json({
      success: true,
      message: 'Client retrieved successfully.',
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the client.',
    });
  }
};


//////////GET CLIENT ALL DATA////////

exports.getAllClients = async (req, res) => {
  try {
    // Fetch all clients from the database
    const clients = await Client.findAll();

    // Respond with the list of clients
    res.status(200).json({
      success: true,
      message: "Clients retrieved successfully",
      data: clients,
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve clients",
      error: error.message,
    });
  }
};


///////////STATUS UPDATED///////////

exports.updateClientStatus = async (req, res) => {
  const { id } = req.params; // Get the client ID from the URL
  const { status } = req.body; // Get the status from the request body
  
  try {
    // Find the client by ID
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    // Update the client's status
    client.status = status;

    // Save the updated client
    await client.save();

    // Respond with the updated client
    res.status(200).json({
      success: true,
      message: "Client status updated successfully",
      data: client,
    });
  } catch (error) {
    console.error('Error updating client status:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update client status",
      error: error.message,
    });
  }
};


///////////DELETE CLIENT BY ID///////////



exports.deleteClient = async (req, res) => {
  const { id } = req.params; // Get the client ID from the URL
  
  try {
    // Find the client by ID
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    // Delete the client
    await client.destroy();

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({
      success: false,
      message: "Failed to delete client",
      error: error.message,
    });
  }
};
