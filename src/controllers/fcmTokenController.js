const { FcmToken, User } = require("../../models"); // Import Sequelize models
const { Op } = require('sequelize');

exports.createToken = async (req, res) => {
  try {
    let { token, userId, role } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (role === "Admin") {
      userId = 1; // Default to admin user
    } else {
      if (!userId) {
        return res.status(400).json({ message: "User ID is required for non-admin roles" });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    // Check if the combination of token and userId already exists in the FcmToken table
    const existingToken = await FcmToken.findOne({
      where: {
        token: token,
        user_id: userId
      }
    });

    if (existingToken) {
      return res.status(400).json({ message: "This token is already assigned to this user." });
    }

    // Create a new token entry since the user does not already have the token
    const newToken = await FcmToken.create({ token, user_id: userId });

    return res.status(201).json({ message: "Token saved successfully", data: newToken });

  } catch (error) {
    console.error("Error saving FCM token:", error);  // Log the error for debugging
    return res.status(500).json({ message: "Internal Server Error", error: error.message }); // Include the error message in the response
  }
};





exports.getTokens = async (req, res) => {
  try {
    const { userId } = req.query;

    let whereCondition = {};
    if (userId) {
      whereCondition.user_id = userId;
    }

    const tokens = await FcmToken.findAll({
      where: whereCondition,
      attributes: ["id", "token", "user_id", "created_at"],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json(tokens);
  } catch (error) {
    console.error("Error fetching FCM tokens:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

