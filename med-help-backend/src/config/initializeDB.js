import { generateId } from "../utils/generateId.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import pool from "./db.js";
dotenv.config();
// Create Users Table and Seed Admin
export const initializeDB = async () => {
  try {
    // Create the users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) NOT NULL PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        age INT CHECK (age >= 0),
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        phone VARCHAR(15) NOT NULL,
        address VARCHAR(255) NOT NULL,
        role ENUM('patient', 'admin', 'volunteer') NOT NULL,
        password VARCHAR(255) NOT NULL,
        UNIQUE(email, role),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Users table created or already exists.");

    // Check if admin already exists
    const [admin] = await pool.query(
      `SELECT * FROM users WHERE role = 'admin' LIMIT 1;`
    );

    if (admin.length === 0) {
      const password = process.env.ADMIN_PASSWORD || "";
      const adminPassword = await bcrypt.hash(password, 12);
      await pool.query(
        `INSERT INTO users (id, firstName, lastName, email, age, gender, phone, address, role, password) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          generateId(),
          "Admin",
          "User",
          "admin@medHelp.com",
          30,
          "male",
          "1234567890",
          "Admin Address",
          "admin",
          adminPassword,
        ]
      );
      console.log("✅ Admin user seeded successfully.");
    } else {
      console.log("⚠️ Admin user already exists.");
    }
  } catch (error) {
    console.error("❌ Error during database initialization:", error.message);
  }
};
