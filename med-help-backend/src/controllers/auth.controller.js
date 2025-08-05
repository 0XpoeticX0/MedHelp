import db from "../config/db.js";
import { loginUser } from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";

export const loginUserController = async (req, res) => {
  try {
    const result = await loginUser(req);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM users) AS totalUsers,
        (SELECT COUNT(*) FROM users WHERE role = 'patient') AS totalPatients,
        (SELECT COUNT(*) FROM users WHERE role = 'volunteer') AS totalVolunteers,
        (SELECT COUNT(*) FROM trainers) AS totalTrainers,
        (SELECT COUNT(*) FROM users WHERE isBlocked = false) AS activeUsers,
        (SELECT COUNT(*) FROM users WHERE isBlocked = true) AS blockedUsers,
        (SELECT COUNT(*) FROM courses) AS totalCourses,
        (SELECT COUNT(*) FROM helps WHERE status = 'completed') AS totalHelps,
        (SELECT COUNT(*) FROM volunteer_availability WHERE is_available = 'available') AS totalActiveVolunteers
    `;

    const [result] = await db.execute(query);

    return res.status(200).json({
      success: true,
      stats: result[0],
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard stats:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve statistics",
    });
  }
};

export const sendMailController = async (req, res) => {
  try {
    // console.log(req.body);

    const { email, name, subject, message } = req.body;

    await sendEmail(email, name, subject, message);
    res.status(200).json({ message: "Send Message Successfully" });
  } catch (error) {
    console.error("Error creating user:", err.message);

    res.status(400).json({
      message: err.message || "Failed to send mail",
    });
  }
};
