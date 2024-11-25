const updateMember = async (req, res) => {
  const memberId = req.params.id;
  const {
    mobile_number,
    email,
    state,
    city,
    street_name,
    pincode,
  } = req.body;

  try {
    // Find the member by ID
    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    // Check if mobile number already exists in the database (excluding the current member)
    const existingMobileNumber = await Member.findOne({
      where: { mobile_number, id: { [Op.ne]: memberId } },
    });

    if (existingMobileNumber) {
      return res.status(400).json({ success: false, message: 'Mobile number already exists' });
    }

    // Check if email already exists in the database (excluding the current member)
    const existingEmail = await Member.findOne({
      where: { email, id: { [Op.ne]: memberId } },
    });

    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Update member details, including setting approved to "Completed"
    await member.update({
      mobile_number,
      email,
      state,
      city,
      street_name,
      pincode,
      approved: 'Completed', // Set approved column to "Completed"
    });

    return res.status(200).json({
      success: true,
      message: 'Member updated successfully',
      member, // Include the updated member details in the response
    });
  } catch (error) {
    console.error('Error updating member:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  updateMember,
};
