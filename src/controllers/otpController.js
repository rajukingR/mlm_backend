const axios = require('axios');
const twilio = require('twilio');

// Twilio credentials
const accountSid = 'ACa6f2954bbedb11f3998a3235e8340a85';
const authToken = '45b1a03efc6cb7cef39eb5506548ea43';
const serviceSid = 'VA9382da8780d1e59942f29792918cb593';  // Your Twilio service SID

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Send OTP function
const sendOtp = async (req, res) => {
    const { phoneNumber } = req.body;

    // Validate phone number input
    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    try {
        // Send OTP request via Twilio API
        const verification = await client.verify.v2.services(serviceSid)
            .verifications
            .create({ to: phoneNumber, channel: 'sms' });

        // Log the verification SID for debugging purposes
        console.log('Twilio verification SID:', verification.sid);

        return res.status(200).json({
            success: true,
            message: `OTP sent successfully to ${phoneNumber}`,
            data: verification.sid,  // You can use this SID for tracking or debugging
        });
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error sending OTP',
            error: error.message,
        });
    }
};

// Verify OTP function
const verifyOtp = async (req, res) => {
    const { phoneNumber, code } = req.body;

    // Validate input
    if (!phoneNumber || !code) {
        return res.status(400).json({ success: false, message: 'Phone number and OTP code are required' });
    }

    try {
        // Verify the OTP using Twilio API
        const verificationCheck = await client.verify.v2.services(serviceSid)
            .verificationChecks
            .create({ to: phoneNumber, code: code });

        // Log the verification status for debugging purposes
        console.log('Verification status:', verificationCheck.status);

        // Handle the verification response
        if (verificationCheck.status === 'approved') {
            return res.status(200).json({
                success: true,
                message: 'OTP verified successfully',
            });
        } else if (verificationCheck.status === 'expired') {
            return res.status(400).json({
                success: false,
                message: 'OTP has expired. Please request a new one.',
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP or incorrect code.',
            });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error verifying OTP',
            error: error.message,
        });
    }
};

module.exports = { sendOtp, verifyOtp };
