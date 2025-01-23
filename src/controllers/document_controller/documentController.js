const { Document, User, Notification } = require('../../../models');
const { Op } = require('sequelize');
const moment = require('moment');  // Import moment.js


exports.getDocuments = async (req, res) => {
  try {
    const { role_name } = req.user; // Get role directly from the token

    // Base where clause for active documents
    let whereClause = {
      status: 'active', // Only active documents
    };

    // Role-based filtering
    if (role_name !== 'Admin') {
      // Non-admin roles can only see documents relevant to them
      whereClause.receiver = {
        [Op.like]: `%${role_name}%`, // Check if the role is in the receiver field
      };
    }

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

    // Validate the `receiver` field to ensure it includes the user's role
    const filteredDocuments = documents.filter(doc => {
      try {
        let receivers;

        if (typeof doc.receiver === 'string') {
          receivers = JSON.parse(doc.receiver); // Parse if stored as JSON string
        } else if (Array.isArray(doc.receiver)) {
          receivers = doc.receiver; // Use directly if it's already an array
        } else {
          receivers = [];
        }

        // Check if the user's role exists in the receivers array
        return receivers.some(receiver => receiver.trim() === role_name.trim());
      } catch (error) {
        console.error("Error parsing receiver field:", error);
        return false; // Skip documents with invalid receiver data
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


exports.getDocumentsAdmin = async (req, res) => {
  try {
    const { receiver } = req.query;
    const whereClause = {
      status: 'active',
      ...(receiver && { receiver }),
    };

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
// exports.getDocumentsAdmin = async (req, res) => {
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
        message: `New Document received: ${heading}`, 
        is_read: false, 
        created_at: new Date(), 
        detail: {
          link,
          receiver: parsedReceiver,
          user_name:user.full_name,
          image: req.file ? req.file.filename : null,
          type:"document"
        },
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
    document.link = link || null;

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
