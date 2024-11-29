const { Document } = require('../../models');
const { Op } = require('sequelize');
const moment = require('moment');  // Import moment.js

exports.getDocuments = async (req, res) => {
  try {
    const { role_name } = req.user;  // Get role directly from the token

    let whereClause = {};

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

    const documents = await Document.findAll({
      where: whereClause,
    });

    if (!documents.length) {
      return res.status(404).json({
        success: false,
        message: 'No documents found for the user\'s role',
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
        message: 'No documents found for the user\'s role',
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
    activateStatus,
    fromDate,
    toDate,
  } = req.body;

  try {
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
      activateStatus,
      fromDate: autoUpdate ? fromDate : null,
      toDate: autoUpdate ? toDate : null,
      image: req.file ? req.file.filename : null, // Save only the filename
    });

    // Emit event for new document
    req.io.emit('new_document', document);

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
    activateStatus,
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

    document.documentID = documentID || document.documentID;
    document.heading = heading || document.heading;
    document.description = description || document.description;
    document.link = link || document.link;

    // Ensure receiver is always stored as an array
    if (receiver) {
      document.receiver = Array.isArray(receiver)
        ? receiver
        : JSON.parse(receiver);
    }

    document.autoUpdate =
      autoUpdate !== undefined ? autoUpdate : document.autoUpdate;
    document.activateStatus =
      activateStatus !== undefined ? activateStatus : document.activateStatus;

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




//UPDATED DOCUMENTS BASED ON FROM DATE AND TO DATE

const updateDocumentsPeriodically = () => {
  setInterval(async () => {
    try {
      const now = moment().format('YYYY-MM-DD HH:mm:ss'); 

      const documentsToUpdate = await Document.findAll({
        where: {
          autoUpdate: 1,
          fromDate: { [Op.lte]: now },
          toDate: { [Op.gte]: now },
        },
      });

      for (const doc of documentsToUpdate) {
        try {
          if (moment(now).isAfter(moment(doc.toDate))) {
            doc.autoUpdate = 0;
            doc.fromDate = null;
            doc.toDate = null;
            doc.status = 'Expired'; 
            await doc.save();
            console.log(`Document ID ${doc.id} expired. autoUpdate=0, dates NULL, status set to 'Expired'.`);
          } else {
            doc.updatedAt = now;
            await doc.save();
            console.log(`Document ID ${doc.id} updated at ${doc.updatedAt}`);
          }
        } catch (err) {
          console.error(`Error processing Document ID ${doc.id}:`, err);
        }
      }
    } catch (error) {
      console.error('Error updating documents:', error);
    }
  }, 30000); 
};

// updateDocumentsPeriodically();