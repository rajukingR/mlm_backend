const { Announcement } = require('../../models');

// Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
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
  const { documentID, heading, description, link, receiver, autoUpdate, activateStatus } = req.body;

  // Check for required fields
  if (!documentID || !heading || !receiver) {
    return res.status(400).json({ success: false, message: 'Document ID, heading, and receiver are required' });
  }

  try {
    const existingAnnouncement = await Announcement.findOne({ where: { documentID } });

    if (existingAnnouncement) {
      return res.status(409).json({
        success: false,
        message: 'Document ID already exists',
      });
    }

    // Handle image upload if necessary
    const image = req.file ? req.file.filename : null; // Assuming you're using multer or similar for file uploads

    const newAnnouncement = await Announcement.create({
      documentID,
      heading,
      description,
      link,
      receiver,
      autoUpdate,
      activateStatus,
      image,
    });

    return res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: newAnnouncement,
    });
  } catch (error) {
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
  const { documentID, heading, description, link, receiver, autoUpdate, activateStatus } = req.body;

  try {
    const announcement = await Announcement.findByPk(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    // Update announcement details
    announcement.documentID = documentID || announcement.documentID;
    announcement.heading = heading || announcement.heading;
    announcement.description = description || announcement.description;
    announcement.link = link || announcement.link;
    announcement.receiver = receiver || announcement.receiver;
    announcement.autoUpdate = autoUpdate !== undefined ? autoUpdate : announcement.autoUpdate; // Update only if provided
    announcement.activateStatus = activateStatus !== undefined ? activateStatus : announcement.activateStatus; // Update only if provided

    // Handle image update if necessary
    if (req.file) {
      announcement.image = req.file.filename; // Update with the new image file
    }

    await announcement.save();

    return res.status(200).json({
      success: true,
      message: 'Announcement updated successfully',
      data: announcement,
    });
  } catch (error) {
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
