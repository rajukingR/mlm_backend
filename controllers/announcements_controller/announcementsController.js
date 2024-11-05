const { Announcement } = require('../../models');

// Get all announcements with optional filtering by receiver
exports.getAnnouncements = async (req, res) => {
  try {
    const { receiver } = req.query; // Get the receiver from the query params
    const whereClause = receiver ? { receiver } : {}; // Set up the filtering condition

    const announcements = await Announcement.findAll({
      where: whereClause, // Apply the where clause if receiver is provided
    });

    return res.status(200).json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements',
      error: error.message,
    });
  }
};

// Get an announcement by ID
exports.getByIdAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const announcement = await Announcement.findByPk(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch announcement',
      error: error.message,
    });
  }
};

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const {
      documentID,
      heading,
      description,
      link,
      receiver,
      autoUpdate,
      activateStatus,
      fromDate,  // Include fromDate
      toDate,    // Include toDate
    } = req.body;

    if (!documentID || !heading || !receiver) {
      return res.status(400).json({
        success: false,
        message: 'Document ID, heading, and receiver are required fields.',
      });
    }

    const announcement = await Announcement.create({
      documentID,
      heading,
      description,
      link,
      receiver,
      autoUpdate,
      activateStatus,
      fromDate: autoUpdate ? fromDate : null, // Only save if autoUpdate is enabled
      toDate: autoUpdate ? toDate : null,       // Only save if autoUpdate is enabled
      image: req.file ? req.file.path : null, // Send the image path in the response
    });

    // Emit event for new announcement using `req.io`
    req.io.emit('new_announcement', announcement);

    return res.status(201).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    console.error('Error creating announcement:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create announcement',
      error: error.message,
    });
  }
};

// Update an announcement by ID
exports.updateByIdAnnouncement = async (req, res) => {
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
    const announcement = await Announcement.findByPk(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    // Update fields accordingly
    announcement.documentID = documentID || announcement.documentID;
    announcement.heading = heading || announcement.heading;
    announcement.description = description || announcement.description;
    announcement.link = link || announcement.link;
    announcement.receiver = receiver || announcement.receiver;
    announcement.autoUpdate = autoUpdate !== undefined ? autoUpdate : announcement.autoUpdate;
    announcement.activateStatus = activateStatus !== undefined ? activateStatus : announcement.activateStatus;

    if (announcement.autoUpdate) {
      announcement.fromDate = fromDate || announcement.fromDate;
      announcement.toDate = toDate || announcement.toDate;
    }

    // Handle file upload if present (assuming similar to document)
    if (req.file) {
      announcement.image = req.file.filename; // Assuming you want to handle image uploads
    }

    await announcement.save(); // Save updated announcement

    return res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    console.error('Error updating announcement:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update announcement',
      error: error.message,
    });
  }
};

// Delete an announcement by ID
exports.deleteByIdAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findByPk(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    await announcement.destroy();

    // Emit event for deleted announcement using `req.io`
    req.io.emit('delete_announcement', { id });

    return res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete announcement',
      error: error.message,
    });
  }
};
