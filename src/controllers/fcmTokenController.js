const { FcmToken, User } = require("../../models"); // Import Sequelize models

exports.createToken = async (req, res) => {
  try {
    const { token, userId } = req.body;

    if (!token || !userId) {
      return res.status(400).json({ message: "Token and User ID are required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a token already exists for the user
    const existingToken = await FcmToken.findOne({ where: { user_id: userId } });

    if (existingToken) {
      await existingToken.update({ token });
      return res.json({ message: "Token updated successfully", data: existingToken });
    } else {
      const newToken = await FcmToken.create({ token, user_id: userId });
      return res.status(201).json({ message: "Token saved successfully", data: newToken });
    }
  } catch (error) {
    console.error("Error saving FCM token:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

