import db from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import { haversineDistance } from "../utils/haversineDistance.js";

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
  try {
    // Validate volunteerId
    if (!volunteerId) {
      throw new Error("Missing volunteerId parameter");
    }

    // Get volunteer's current location
    const [volunteerLocation] = await db.query(
      `
        SELECT latitude, longitude
        FROM volunteer_availability
        WHERE volunteer_id = ?
      `,
      [volunteerId]
    );

    if (!volunteerLocation || volunteerLocation.length === 0) {
      return { error: "Volunteer location not found" };
    }

    const { latitude: volunteerLat, longitude: volunteerLon } =
      volunteerLocation[0];

    // Validate coordinates
    if (!volunteerLat || !volunteerLon) {
      return { error: "Invalid volunteer location coordinates" };
    }

    // Get all pending help requests
    const [helps] = await db.query(`
      SELECT id, patient_id, latitude, longitude, status
      FROM helps
      WHERE status = 'pending'
    `);

    if (!helps) {
      return { error: "No pending help requests found" };
    }

    // Filter helps within 5km
    const nearbyHelps = helps.filter((help) => {
      try {
        const distance = haversineDistance(
          parseFloat(volunteerLat),
          parseFloat(volunteerLon),
          parseFloat(help.latitude),
          parseFloat(help.longitude)
        );
        return distance <= 5;
      } catch (filterError) {
        console.error("Error calculating distance:", filterError.message);
        return false; // Skip this help request if distance calculation fails
      }
    });

    return nearbyHelps.length
      ? nearbyHelps
      : { message: "No help requests within 5 km" };
  } catch (error) {
    console.error("Error in getHelpForVolunteer:", error.message);
    throw new Error(
      error.message || "Failed to fetch help requests for volunteer"
    );
  }
};

export const updateHelpStatus = async (helpId, volunteerId) => {
  try {
    // Step 1: Check if the help is still pending
    const [helps] = await db.query(`SELECT status FROM helps WHERE id = ?`, [
      helpId,
    ]);

    // console.log(helpId, volunteerId, status);

    if (helps.length === 0) {
      return { success: false, message: "Help not found." };
    }

    const help = helps[0];

    if (help.status === "assigned" || help.status === "completed") {
      return { success: false, message: "Help is no longer available." };
    }

    // Step 2: Assign the volunteer and update status
    await db.query(
      `UPDATE helps 
       SET status = 'assigned', volunteer_id = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [volunteerId, helpId]
    );

    // Step 3: Update the volunteer's availability status to 'inService'
    await db.query(
      `UPDATE volunteer_availability 
       SET is_available = 'inService', updated_at = CURRENT_TIMESTAMP 
       WHERE volunteer_id = ?`,
      [volunteerId]
    );

    return { success: true, message: "Help assigned successfully." };
  } catch (error) {
    console.error("❌ Error updating help status:", error.message);
    return { success: false, message: "Server error." };
  }
};

export const completeHelp = async (helpId, volunteerId) => {
  try {
    // Step 1: Check if the help is still pending
    const [helps] = await db.query(`SELECT status FROM helps WHERE id = ?`, [
      helpId,
    ]);

    // console.log(helpId, volunteerId, status);

    if (helps.length === 0) {
      return { success: false, message: "Help not found." };
    }

    const help = helps[0];

    if (help.status === "pending" || help.status === "completed") {
      return { success: false, message: "Help is no longer available." };
    }

    // Step 2: Assign the volunteer and update status
    await db.query(
      `UPDATE helps 
       SET status = 'completed', volunteer_id = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [volunteerId, helpId]
    );

    // Step 3: Update the volunteer's availability status to 'inService'
    await db.query(
      `UPDATE volunteer_availability 
       SET is_available = 'available', updated_at = CURRENT_TIMESTAMP 
       WHERE volunteer_id = ?`,
      [volunteerId]
    );

    return { success: true, message: "Help completed successfully." };
  } catch (error) {
    console.error("❌ Error updating help status:", error.message);
    return { success: false, message: "Server error." };
  }
};

export const getHelpById = async (helpId) => {
  try {
    const [helps] = await db.query(`SELECT * FROM helps WHERE id = ?`, [
      helpId,
    ]);

    if (helps.length === 0) {
      return { error: "Help not found." };
    }

    return helps[0];
  } catch (error) {
    console.error("❌ Error fetching help by ID:", error.message);
    throw new Error("Failed to fetch help.");
  }
};

export const getRunningServices = async (volunteerId) => {
  try {
    // console.log("Fetching running services for volunteer:", volunteerId);

    const [services] = await db.query(
      `SELECT * FROM helps WHERE volunteer_id = ? AND status = 'assigned'`,
      [volunteerId]
    );

    if (services.length === 0) {
      return { message: "No running services." };
    }

    // console.log(services);

    return services;
  } catch (error) {
    console.error("❌ Error fetching running services:", error.message);
    throw new Error("Failed to fetch running services.");
  }
};

export const getServiceHistory = async (volunteerId) => {
  //console.log("Fetching service history for volunteer:", volunteerId);
  try {
    const [history] = await db.query(
      `SELECT * FROM helps WHERE volunteer_id = ? AND status = 'completed'`,
      [volunteerId]
    );

    if (history.length === 0) {
      return { message: "No service history." };
    }

    return history;
  } catch (error) {
    console.error("❌ Error fetching service history:", error.message);
    throw new Error("Failed to fetch service history.");
  }
};

export const getPatientHelpHistory = async (p_id) => {
  try {
    const query = `
      SELECT 
        CONCAT(u.firstName, ' ', u.lastName) AS volunteerName,
        h.created_at AS helpDate
      FROM helps h
      LEFT JOIN users u ON h.volunteer_id = u.id
      WHERE h.patient_id = ?
      ORDER BY h.created_at DESC
    `;

    const [rows] = await db.query(query, [p_id]);
    return rows;
  } catch (error) {
    console.error("❌ Error fetching help by ID:", error.message);
    throw new Error("Failed to fetch help.");
  }
};
