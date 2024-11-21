const { Document } = require('../../models');
const { Op } = require('sequelize');
const moment = require('moment');

const updateExpiredDocuments = async () => {
  try {
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss'); // Get current date and time

    await Document.update(
      {
        autoUpdate: 0,
        activateStatus: 0,
      },
      {
        where: {
          toDate: { [Op.lt]: currentDate }, 
        },
      });

    console.log('Expired documents updated successfully');
  } catch (error) {
    console.error('Error updating expired documents:', error);
  }
};

// setInterval(updateExpiredDocuments, 10000); 

exports.getDocuments = async (req, res) => {
  try {
    const { role_name } = req.user;
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss'); 

    let whereClause = {};

    if (role_name === 'Admin') {
      whereClause = {
        [Op.or]: [
          {
            fromDate: { [Op.lte]: currentDate }, 
            toDate: { [Op.gte]: currentDate },  
          },
          {
            toDate: { [Op.lt]: currentDate }, 
          }
        ]
      };
    } else {
      whereClause = {
        receiver: {
          [Op.like]: `%${role_name}%`, 
        },
        [Op.or]: [
          {
            fromDate: { [Op.lte]: currentDate }, 
            toDate: { [Op.gte]: currentDate },   
          },
        ]
      };
    }

    const documents = await Document.findAll({
      where: whereClause,
    });

    if (!documents.length) {
      return res.status(404).json({
        success: false,
        message: 'No documents found for the user\'s role or the selected time period',
      });
    }

    return res.status(200).json({
      success: true,
      data: documents,
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
    // Image format validation
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    if (req.file && !allowedFormats.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Only JPEG, PNG, and GIF are allowed.',
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
        message: 'Document not found',
      });
    }

    document.documentID = documentID || document.documentID;
    document.heading = heading || document.heading;
    document.description = description || document.description;
    document.link = link || document.link;
    document.receiver = receiver || document.receiver;
    document.autoUpdate = autoUpdate !== undefined ? autoUpdate : document.autoUpdate;
    document.activateStatus = activateStatus !== undefined ? activateStatus : document.activateStatus;

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
    console.error('Error updating document:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update document',
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
