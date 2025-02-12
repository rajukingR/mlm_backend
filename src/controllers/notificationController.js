const admin = require("../config/firebaseAdmin"); // Firebase Admin SDK
const { FcmToken, Notification,User } = require("../../models"); // Import models

// Send Notification to a Specific User
exports.sendNotification = async (req, res) => {
  try {

    let USER_ROLE_NAME = req.user.role_name;
    let user_id = req.user.id;

    if (USER_ROLE_NAME === "Admin") {
      user_id = 1;
    }

    // Fetch the latest notification for the user
    const latestNotification = await Notification.findOne({
      where: { user_id, status: "Active" },
      order: [["created_at", "DESC"]], // Get the most recent notification
    });

    if (!latestNotification) {
      return res.status(404).json({ message: "No active notifications found for the user" });
    }

    const title = latestNotification.message || "New Notification";
    const body = latestNotification.detail.type || "You have a new update!";

    // Fetch the FCM token for the given user_id
    const userToken = await FcmToken.findOne({
      where: { user_id },
      attributes: ["token"],
    });

    if (!userToken || !userToken.token) {
      return res.status(404).json({ message: "User's FCM token not found" });
    }

    // Notification Payload
    const message = {
      token: userToken.token,
      notification: { title, body },
      data: { user_id: String(user_id) },
      android: { notification: { sound: "default" } },
      apns: { payload: { aps: { sound: "default" } } },
    };

    // Send the notification via Firebase
    await admin.messaging().send(message);

    res.status(200).json({
      message: "Notification sent successfully",
      success: true,
      notification: { title, body }, // Return notification details
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ message: "Failed to send notification", error: error.message });
  }
};
