import db from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import pool from "../config/db.js";

export const createTrainer = async (req) => {
  const { fullname, age, qualifications, bloodType, address, email, phoneNo } =
    req.body;

  const query = `
      INSERT INTO trainers (
        id, fullname, age, qualifications, bloodType, address, email, phoneNo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

  try {
    const trainerId = generateId(); // Generate a unique ID

    // Execute the query
    const [result] = await db.execute(query, [
      trainerId,
      fullname,
      age,
      qualifications,
      bloodType,
      address,
      email,
      phoneNo,
    ]);

    return { id: trainerId, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error creating trainer:", error.message);
    throw error;
  }
};

export const getTrainers = async () => {
  const query = `SELECT * FROM trainers`;

  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (error) {
    console.error("❌ Error retrieving trainers:", error.message);
    throw error;
  }
};

export const editTrainerById = async (req) => {
  const { id } = req.params;
  const { fullname, age, qualifications, bloodType, address, email, phoneNo } =
    req.body;

  // First, get the current trainer data to preserve unprovided fields
  const [existingRows] = await pool.query(
    "SELECT * FROM trainers WHERE id = ?",
    [id]
  );

  if (existingRows.length === 0) {
    throw new Error("No trainer found with the specified ID");
  }

  const currentTrainer = existingRows[0];

  // Build the update dynamically based on provided fields
  const updates = {};
  if (fullname !== undefined) updates.fullname = fullname;
  if (age !== undefined) updates.age = age;
  if (qualifications !== undefined) updates.qualifications = qualifications;
  if (bloodType !== undefined) updates.bloodType = bloodType;
  if (address !== undefined) updates.address = address;
  if (email !== undefined) updates.email = email;
  if (phoneNo !== undefined) updates.phoneNo = phoneNo;

  // If no fields to update, return early
  if (Object.keys(updates).length === 0) {
    return { id, affectedRows: 0, message: "No fields provided to update" };
  }

  // Construct the query dynamically
  const setClause = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");
  const query = `
    UPDATE trainers 
    SET ${setClause}
    WHERE id = ?;
  `;

  // Validate constraints
  if (updates.age !== undefined && updates.age <= 18) {
    throw new Error("Age must be greater than 18");
  }

  try {
    const [result] = await pool.query(query, [...Object.values(updates), id]);

    if (result.affectedRows === 0) {
      throw new Error("No trainer found with the specified ID");
    }

    return { id, affectedRows: result.affectedRows };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("Email address is already in use");
    } else if (error.code === "ER_BAD_NULL_ERROR") {
      throw new Error("Required field cannot be null");
    } else if (error.code === "ER_CHECK_CONSTRAINT_VIOLATED") {
      throw new Error("Age must be greater than 18");
    }

    console.error("❌ Error updating trainer:", error.message);
    throw error;
  }
};

export const deleteTrainerById = async (req) => {
  const { id } = req.params;
  const query = `DELETE FROM trainers WHERE id = ?`;

  try {
    const [result] = await db.execute(query, [id]);

    return result.affectedRows > 0;
  } catch (error) {
    console.error("❌ Error deleting trainer:", error.message);
    throw error;
  }
};
