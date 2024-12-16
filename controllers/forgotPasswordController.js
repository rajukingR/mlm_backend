const { User } = require('../models'); // Import the User model 
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const secretKey = 'mttmtt4699'; // Secret key for encryption (this should ideally be stored in environment variables)

// Function to encrypt password
const encryptPassword = (password) => {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Function to send password reset link
const sendForgotPasswordLink = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    // Generate a reset token (for security)
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Store reset token in the database (optional but recommended for security purposes)
    user.resetToken = resetToken;
    await user.save();

    // Generate the reset link
    const resetLink = `http://88.222.245.236/create-password?token=${resetToken}`;

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'rajuking9160@gmail.com', // Your email
        pass: 'ifye whlp asxl owhf', // Your email password
      },
    });

    // Compose the email content
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Reset link sent to your email.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to reset password
const resetPassword = async (req, res) => {
  const { token, password } = req.body; // Get the reset token and new password from the request body

  try {
    // Find user by reset token
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired reset token.' });
    }

    // Encrypt the new password
    const encryptedPassword = encryptPassword(password);

    // Update the user's password in the database
    await User.update({ password: encryptedPassword, resetToken: null }, { where: { resetToken: token } });

    // Fetch the user's full name
    const fullName = user.full_name;

    // Configure Nodemailer transporter for password update confirmation
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'rajuking9160@gmail.com', // Your email
        pass: 'ifye whlp asxl owhf', // Your email password
      },
    });

    // Compose the email content
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Password Successfully Updated',
      html: `<p>Hello ${fullName},</p><p>Your password has been successfully updated. If this was not you, please contact support immediately.</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { sendForgotPasswordLink, resetPassword };
