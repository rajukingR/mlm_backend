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

// Create a new edit request with validation
exports.createEditRequest = [
  // Validate input fields
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('role_id').isInt().withMessage('Role ID must be an integer'),
  body('request_reason').isString().notEmpty().withMessage('Request reason is required'),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { user_id, role_id, request_reason, new_mobile_number, new_email_id, new_address } = req.body;

    try {
      const newEditRequest = await EditRequest.create({
        user_id,
        role_id,
        request_reason,
        new_mobile_number,
        new_email_id,
        new_address,
      });

      return res.status(201).json({
        success: true,
        message: 'Edit request created successfully',
        data: newEditRequest
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create edit request',
        error: error.message
      });
    }
  }
];

// Update edit request by ID
exports.updateByIdEditRequest = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  const { user_id, role_id, request_reason, new_mobile_number, new_email_id, new_address } = req.body;

  try {
    const editRequest = await EditRequest.findByPk(id); // Find by primary key

    if (!editRequest) {
      return res.status(404).json({
        success: false,
        message: 'Edit request not found'
      });
    }

    // Update fields if provided
    editRequest.user_id = user_id || editRequest.user_id;
    editRequest.role_id = role_id || editRequest.role_id;
    editRequest.request_reason = request_reason || editRequest.request_reason;
    editRequest.new_mobile_number = new_mobile_number || editRequest.new_mobile_number;
    editRequest.new_email_id = new_email_id || editRequest.new_email_id;
    editRequest.new_address = new_address || editRequest.new_address;

    await editRequest.save(); // Save changes to the database

    return res.status(200).json({
      success: true,
      message: 'Edit request updated successfully',
      data: editRequest
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update edit request',
      error: error.message
    });
  }
};

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
