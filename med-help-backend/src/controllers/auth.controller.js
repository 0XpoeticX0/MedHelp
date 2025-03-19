import db from "../config/db.js";
import { loginUser } from "../models/user.model.js";

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
        (SELECT COUNT(*) FROM trainers) AS totalTrainers,
        (SELECT COUNT(*) FROM users WHERE isBlocked = false) AS activeUsers,
        (SELECT COUNT(*) FROM users WHERE isBlocked = true) AS blockedUsers,
        (SELECT COUNT(*) FROM courses) AS totalCourses
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
