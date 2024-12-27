const { Document, User, Notification } = require('../../models');
const { Op } = require('sequelize');
const moment = require('moment');  // Import moment.js

exports.getDocuments = async (req, res) => {
  try {
    const { role_name } = req.user;  // Get role directly from the token
    let whereClause = {};

    // Check the role and set the where clause for filtering
    if (role_name === 'Admin') {
      // Admin can view all documents
      whereClause = {};
    } else if (role_name === 'Distributor') {
      // Filter documents for Distributor role
      whereClause = {
        receiver: {
          [Op.like]: '%Distributor%' // Only show documents with "Distributor" in the receiver field
        },
      };
    } else {
      // Non-admin roles can only see documents relevant to them
      whereClause = {
        receiver: {
          [Op.like]: `%${role_name}%`, // Check if the role is in the receiver field
        },
      };
    }

    // Add date range filtering: Ensure that the document is active within the date range
    whereClause = {
      ...whereClause,
      fromDate: {
        [Op.lte]: moment().toDate(), // fromDate should be less than or equal to current date
      },
      toDate: {
        [Op.gte]: moment().toDate(), // toDate should be greater than or equal to current date
      },
      status: 'active', // Only active documents
      autoUpdate: 1, // Only active documents

    };

    // Fetch documents from database based on the whereClause
    const documents = await Document.findAll({
      where: whereClause,
    });

    if (!documents.length) {
      return res.status(404).json({
        success: false,
        message: "No documents found for the user's role",
      });
    }

    // Ensure the receiver field is an array and validate against allowed roles
    const allowedRoles = ['Area Development Officer', 'Master Distributor', 'Super Distributor', 'Distributor', 'Customer'];

    const filteredDocuments = documents.filter(doc => {
      let receivers;
      try {
        // Log the receiver field for debugging purposes
        console.log("Receiver field:", doc.receiver);

        // Try to parse the receiver field into an array if it's a string
        if (typeof doc.receiver === 'string') {
          receivers = JSON.parse(doc.receiver); // Try parsing if it's a string
        } else if (Array.isArray(doc.receiver)) {
          receivers = doc.receiver; // If it's already an array, use it directly
        } else {
          receivers = [];
        }

        // Log the parsed receivers array for debugging
        console.log("Parsed receivers:", receivers);

        // Check if the user's role exists in the receivers array
        return receivers.some(receiver => receiver.trim() === role_name);  // Add .trim() to avoid issues with spaces
      } catch (e) {
        console.error("Error parsing receiver field:", e);
        receivers = [];
        return false;
      }
    });

    if (!filteredDocuments.length) {
      return res.status(404).json({
        success: false,
        message: "No documents found for the user's role",
      });
    }

    return res.status(200).json({
      success: true,
      data: filteredDocuments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch documents',
      error: error.message,
    });
  }
};


// Get all documents with optional filtering by receiver
exports.getDocumentsAdmin = async (req, res) => {
  try {
    const { receiver } = req.query; // Extract receiver from query params
    const whereClause = receiver ? { receiver } : {}; // Set where clause based on receiver

    const documents = await Document.findAll({ where: whereClause });

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch documents',
      error: error.message,
    });
  }
};

// // Get all documents with optional filtering by receiver
// exports.getDocuments = async (req, res) => {
//   try {
//     const { receiver } = req.query; // Extract receiver from query params
//     const whereClause = receiver ? { receiver } : {}; // Set where clause based on receiver

//     const documents = await Document.findAll({ where: whereClause });

//     return res.status(200).json({
//       success: true,
//       data: documents,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch documents',
//       error: error.message,
//     });
//   }
// };


// Get a document by ID
exports.getByIdDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch document',
      error: error.message,
    });
  }
};





// Create a new document
exports.createDocument = async (req, res) => {
  const {
    documentID,
    heading,
    description,
    link,
    receiver,
    autoUpdate,
    fromDate,
    toDate,
    status, // Ensure status is included in the request body
  } = req.body;

  try {
    // Set the default status if not provided
    const documentStatus = status || 'active'; // Default status to 'active'

    const allowedMimeType = 'image/';

    if (req.file && !req.file.mimetype.startsWith(allowedMimeType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Only image files are allowed.',
      });
    }

    // Create the document
    const document = await Document.create({
      documentID,
      heading,
      description,
      link,
      receiver,
      autoUpdate,
      status: documentStatus, // Use the default or provided status
      fromDate: autoUpdate ? fromDate : null,
      toDate: autoUpdate ? toDate : null,
      image: req.file ? req.file.filename : null, // Save only the filename
    });

    // Emit event for new document
    req.io.emit('new_document', document);

    /////////////**********Notification******* */
    const parsedReceiver = typeof receiver === 'string' ? JSON.parse(receiver) : receiver;

    if (parsedReceiver.length > 0) {
      // Find all users whose roles match the roles in `receiver`
      const users = await User.findAll({
        where: {
          role_name: {
            [Op.in]: parsedReceiver, // Match role names in the `receiver` array
          },
        },
      });

      const notifications = users.map((user) => ({
        user_id: user.id, 
        message: `New Document: ${heading}`, 
        is_read: false, 
        created_at: new Date(), 
      }));

      // Insert notifications in bulk
      await Notification.bulkCreate(notifications);
    }


    return res.status(201).json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error('Error creating document:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create document',
      error: error.message,
    });
  }
};

// Update a document by ID
exports.updateByIdDocument = async (req, res) => {
  const { id } = req.params;
  const {
    documentID,
    heading,
    description,
    link,
    receiver,
    autoUpdate,
    fromDate,
    toDate,
  } = req.body;

  try {
    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    document.status = "active"; 

    document.documentID = documentID || document.documentID;
    document.heading = heading || document.heading;
    document.description = description || document.description;
    document.link = link || document.link;

    if (receiver) {
      document.receiver = Array.isArray(receiver)
        ? receiver
        : JSON.parse(receiver);
    }

    document.autoUpdate =
      autoUpdate !== undefined ? autoUpdate : document.autoUpdate;

    if (autoUpdate) {
      document.fromDate = fromDate || document.fromDate;
      document.toDate = toDate || document.toDate;
    }

    if (req.file) {
      document.image = req.file.filename;
    }

    await document.save();

    return res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update document",
      error: error.message,
    });
  }
};

// Delete a document by ID
exports.deleteByIdDocument = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    await document.destroy();
    req.io.emit('delete_document', { id });

    return res.status(200).json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete document',
      error: error.message,
    });
  }
};




// Function to check for expired documents and update them every 10 seconds
function autoUpdateDocuments() {
  setInterval(async () => {
    try {
      const now = moment().startOf('day').toDate();  // Local time (start of the day)

      const documentsToUpdate = await Document.findAll({
        where: {
          autoUpdate: 1,  // Filter for documents with autoUpdate set to 1
          toDate: {
            [Op.lt]: now  // Fetch documents where toDate is less than current date (expired)
          }
        }
      });

      // Update the documents
      const result = await Document.update(
        {
          autoUpdate: 0,  
          fromDate: null,  
          toDate: null,   
          status: "Expired"  
        },
        {
          where: {
            autoUpdate: 1,  
            toDate: {
              [Op.lt]: now  
            }
          }
        });

      // Log the updates for each document
      documentsToUpdate.forEach(document => {
        console.log(`Document ID ${document.id} updated successfully.`);
      });

    } catch (error) {
      console.error('Error updating documents:', error);
    }
  }, 30 * 1000);  // Call the function every 10 seconds
}

autoUpdateDocuments(); 
