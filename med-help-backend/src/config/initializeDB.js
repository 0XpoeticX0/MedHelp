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
        isBlocked BOOLEAN DEFAULT FALSE,
        UNIQUE(email, role),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Users table created or already exists.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS trainers (
        id VARCHAR(100) NOT NULL PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        age INT CHECK (age > 18),
        qualifications TEXT NOT NULL,
        bloodType VARCHAR(10) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phoneNo VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Trainers table created or already exists.");

    await pool.query(`
     CREATE TABLE IF NOT EXISTS volunteer_availability (
  volunteer_id VARCHAR(100) PRIMARY KEY,
  is_available ENUM('available', 'notAvailable', 'inService') DEFAULT 'notAvailable',
  latitude DECIMAL(10, 6),
  longitude DECIMAL(10, 6),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (volunteer_id) REFERENCES users(id) ON DELETE CASCADE
);

    `);
    console.log("✅ Volunteer_availability table created or already exists.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR(100) NOT NULL PRIMARY KEY,
        courseName VARCHAR(255) NOT NULL,
        trainer VARCHAR(100) NOT NULL,
        startDate DATE NOT NULL,
        duration INT NOT NULL CHECK (duration > 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (trainer) REFERENCES trainers(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Courses table created or already exists.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS helps (
        id VARCHAR(100) PRIMARY KEY,  
        patient_id VARCHAR(100),
        latitude DECIMAL(10, 6),
        longitude DECIMAL(10, 6),
        status ENUM('pending', 'assigned', 'completed') DEFAULT 'pending',
        volunteer_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (volunteer_id) REFERENCES users(id) ON DELETE SET NULL 
      );
    `);
    console.log("✅ Helps table created or already exists.");

    // Check if admin already exists
    const [admin] = await pool.query(
      `SELECT * FROM users WHERE role = 'admin' LIMIT 1;`
    );

    if (admin.length === 0) {
      const password = process.env.ADMIN_PASSWORD || "";
      const adminEmail = process.env.ADMIN_EMAIL || "";
      const adminPassword = await bcrypt.hash(password, 12);
      await pool.query(
        `INSERT INTO users (id, firstName, lastName, email, age, gender, phone, address, role, password) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          generateId(),
          "Admin",
          "User",
          adminEmail,
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
