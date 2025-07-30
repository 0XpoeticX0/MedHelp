import db from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../utils/jwtHelpers.js";
import dotenv from "dotenv";
import { haversineDistance } from "../utils/haversineDistance.js";

dotenv.config();

export const createUser = async (req) => {
  const {
    firstName,
    lastName,
    email,
    age,
    gender,
    phone,
    address,
    role,
    password,
  } = req.body;

  console.log(req.body);

  const findEmailQuery = `
    SELECT * FROM users WHERE email = ? AND role = ?;
  `;

  const insertUserQuery = `
    INSERT INTO users (
      id, firstName, lastName, email, age, gender, phone, address, password, role
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    // Check if the user with same email and role already exists
    const [existingUser] = await db.execute(findEmailQuery, [email, role]);

    if (existingUser.length > 0) {
      throw new Error("User with this email and role already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = generateId();

    const [result] = await db.execute(insertUserQuery, [
      userId,
      firstName,
      lastName,
      email,
      age,
      gender,
      phone,
      address,
      hashedPassword,
      role,
    ]);

    return { id: userId, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    throw error;
  }
};

export const loginUser = async (req) => {
  const { email, password } = req.body;

  console.log({ password });

  const query = "SELECT * FROM users WHERE email = ?";

  try {
    // Execute the query to find the user by email
    const [rows] = await db.execute(query, [email]);

    if (rows.length === 0) {
      return { success: false, message: "Invalid email or password" };
    }

    const user = rows[0];

    if (getUsers.isBlocked) {
      return { success: false, message: "User is blocked" };
    }

    console.log("userPass:", user.password);

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" };
    }

    // Create JWT payload
    const payload = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      address: user.address,
      phone: user.phone,
      email: user.email,
      role: user.role,
      status: user.isBlocked,
    };

    const accessToken = jwtHelpers.generateToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRES_IN
    );

    // Return user info and token
    return {
      success: true,
      message: "Login successful",
      accessToken,
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Internal server error");
  }
};

// Get all users
export const getUsers = async (req) => {
  const { role } = req.query;

  if (!role) {
    throw new Error("Role is required");
  }

  const query = `SELECT * FROM users WHERE role = ?`;

  try {
    const [rows] = await db.execute(query, [role]);
    return rows;
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    throw error;
  }
};

// Delete User
export const deleteUser = async (req) => {
  const { id } = req.params;

  const query = `DELETE FROM users WHERE id = ?`;

  try {
    const [result] = await db.execute(query, [id]);

    return { id, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
    throw error;
  }
};

// Toggle Block Status
export const toggleBlockStatus = async (req) => {
  const { id } = req.params;

  // Get current block status
  const getStatusQuery = `SELECT isBlocked FROM users WHERE id = ?`;
  const updateQuery = `UPDATE users SET isBlocked = ? WHERE id = ?`;

  try {
    const [rows] = await db.execute(getStatusQuery, [id]);

    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const currentStatus = rows[0].isBlocked;
    const newStatus = !currentStatus;

    // Update status
    const [result] = await db.execute(updateQuery, [newStatus, id]);

    return { id, isBlocked: newStatus, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error toggling block status:", error.message);
    throw error;
  }
};

export const updateVolunteerAvailability = async (
  volunteerId,
  isAvailable,
  latitude,
  longitude
) => {
  const query = `
    INSERT INTO volunteer_availability (volunteer_id, is_available, latitude, longitude)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      is_available = VALUES(is_available),
      latitude = VALUES(latitude),
      longitude = VALUES(longitude),
      updated_at = CURRENT_TIMESTAMP;
  `;

  try {
    const [result] = await db.execute(query, [
      volunteerId,
      isAvailable,
      latitude,
      longitude,
    ]);
    return { affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error updating availability:", error.message);
    throw error;
  }
};

export const getVolunteerAvailability = async (volunteerId) => {
  const query = `
    SELECT * FROM volunteer_availability WHERE volunteer_id = ?;
  `;

  try {
    const [rows] = await db.execute(query, [volunteerId]);
    return rows[0]; // Return the first row if exists
  } catch (error) {
    console.error("❌ Error fetching availability:", error.message);
    throw error;
  }
};

export const seekHelp = async (latitude, longitude, patient_id) => {
  const query = `
    INSERT INTO helps (id, patient_id, latitude, longitude)
    VALUES (?, ?, ?, ?);
  `;

  try {
    const helpId = generateId();
    const [result] = await db.execute(query, [
      helpId,
      patient_id,
      latitude,
      longitude,
    ]);

    return { id: helpId, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error seeking help:", error.message);
    throw error;
  }
};

export const getHelpForVolunteer = async (volunteerId) => {
  if (!volunteerId) {
    return res.status(400).json({ error: "Missing volunteerId parameter" });
  }

  try {
    // Query to get the volunteer's location from the volunteer_availability table
    const [volunteerLocation] = await db.query(
      `
      SELECT latitude, longitude
      FROM volunteer_availability
      WHERE volunteer_id = ?
    `,
      [volunteerId]
    );

    if (volunteerLocation.length === 0) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    const { latitude: volunteerLat, longitude: volunteerLon } =
      volunteerLocation[0];

    // Query to get all helps with patient location that are not yet assigned to a volunteer
    const [helps] = await db.query(`
      SELECT id, patient_id, latitude, longitude, status
      FROM helps
      WHERE volunteer_id IS NULL
    `);

    // Filter helps that are within 5 km of the volunteer's location
    const nearbyHelps = helps.filter((help) => {
      const distance = haversineDistance(
        parseFloat(volunteerLat),
        parseFloat(volunteerLon),
        parseFloat(help.latitude),
        parseFloat(help.longitude)
      );

      return distance <= 5; // Only include helps within 5 km
    });

    if (nearbyHelps.length === 0) {
      return res.status(404).json({ message: "No helps found within 5km." });
    }

    // Return the list of nearby helps
    return nearbyHelps;
  } catch (error) {
    console.error("❌ Error fetching help:", error.message);
    throw error;
  }
};
