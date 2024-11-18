const { Document } = require('../../models');
const { Op } = require('sequelize');

exports.getDocuments = async (req, res) => {
  try {
    const { role_name } = req.user; // Assume role_name is available in req.user

    // Check if the user is an admin (this can be based on role_name or a specific flag like isAdmin)
    if (role_name === 'Admin') {
      // If admin, fetch all documents
      const documents = await Document.findAll();

      return res.status(200).json({
        success: true,
        data: documents,
      });
    }

    // For non-admin users, filter documents based on their role
    const whereClause = {
      receiver: {
        [Op.like]: `%${role_name}%`, // Match role_name within the receiver string
      },
    };

    // Fetch documents with the role_name condition
    const documents = await Document.findAll({
      where: whereClause,
    });

    // Handle case where no documents match
    if (!documents.length) {
      return res.status(404).json({
        success: false,
        message: 'No documents found for the user\'s role',
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

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
