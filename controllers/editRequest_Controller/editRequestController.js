'use strict';

const { EditRequest } = require('../../models');
const { body, validationResult } = require('express-validator');

// Get all edit requests
exports.getEditRequests = async (req, res) => {
  try {
    const editRequests = await EditRequest.findAll();
    return res.status(200).json({
      success: true,
      data: editRequests
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch edit requests',
      error: error.message
    });
  }
};

// Get an edit request by ID
exports.getByIdEditRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const editRequest = await EditRequest.findByPk(id);

    if (!editRequest) {
      return res.status(404).json({
        success: false,
        message: 'Edit request not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: editRequest
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch edit request',
      error: error.message
    });
  }
};

exports.createEditRequest = [
  // Validation middleware
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('role_id').isInt().withMessage('Role ID must be an integer'),
  body('request_reason').isString().notEmpty().withMessage('Request reason is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { user_id, role_id, request_reason, new_mobile_number, new_email_id, new_address } = req.body;

    try {
      // Image format validation is handled in the `upload` middleware
      const image = req.file ? req.file.filename : null;

      const newEditRequest = await EditRequest.create({
        user_id,
        role_id,
        request_reason,
        new_mobile_number,
        new_email_id,
        new_address,
        image,
      });

      return res.status(201).json({
        success: true,
        message: 'Edit request created successfully',
        data: newEditRequest,
      });
    } catch (error) {
      console.error('Error creating edit request:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create edit request',
        error: error.message,
      });
    }
  },
];


// Delete an edit request by ID
exports.deleteByIdEditRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const editRequest = await EditRequest.findByPk(id);

    if (!editRequest) {
      return res.status(404).json({
        success: false,
        message: 'Edit request not found'
      });
    }

    await editRequest.destroy();

    return res.status(200).json({
      success: true,
      message: 'Edit request deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete edit request',
      error: error.message
    });
  }
};


