const { Member } = require('../../models'); // Adjust the path to your member model

// Update member details
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

    // Update member details
    await member.update({
      mobile_number,
      email,
      state,
      city,
      street_name,
      pincode,
    });

    return res.status(200).json({ success: true, message: 'Member updated successfully' });
  } catch (error) {
    console.error('Error updating member:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  updateMember,
};
