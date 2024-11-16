const { Announcement, User } = require('../../models');
const { Op } = require('sequelize');

exports.getAnnouncements = async (req, res) => {
  try {
    const user = req.user; 
    const { role_name } = user;

    // Set the where clause to include role_name and additional conditions for 'All Users'
    const whereClause = {
      [Op.or]: [
        {
          receiver: {
            [Op.like]: `%${role_name}%` // Matches if role_name is part of the receiver string
          }
        },
        {
          receiver: {
            [Op.like]: '%All Users%' // Matches if 'All Users' is part of the receiver string
          }
        },
        { receiver: null },
        { receiver: '' }
      ]
    };

    const announcements = await Announcement.findAll({
      where: whereClause, // Apply the dynamic filtering
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

// controller.js

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const {
      documentID,
      heading,
      description,
      link,
      receiver,
      
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
      
      image: req.file ? req.file.filename : null, // Save only the filename
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
