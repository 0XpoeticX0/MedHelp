import db from "../config/db.js";
import { generateId } from "../utils/generateId.js";

export const createCourse = async (req) => {
  const { courseName, courseImg, trainer, startDate, duration } = req.body;

  const query = `
        INSERT INTO courses (
          id, courseName,courseImg, trainer, startDate, duration
        ) VALUES (?, ?, ?, ?, ?, ?);
      `;

  try {
    const courseId = generateId(); // Generate a unique ID

    // Execute the query
    const [result] = await db.execute(query, [
      courseId,
      courseName,
      courseImg,
      trainer,
      startDate,
      duration,
    ]);

    return { id: courseId, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error creating course:", error.message);
    throw error;
  }
};

export const getCourses = async () => {
  const query = `
    SELECT 
      courses.id AS courseId, 
      courses.courseName, 
      courses.courseImg, 
      courses.startDate, 
      courses.duration, 
      trainers.id AS trainerId, 
      trainers.fullname AS trainerName, 
      trainers.email AS trainerEmail
    FROM courses
    JOIN trainers ON courses.trainer = trainers.id;
  `;

  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (error) {
    console.error("❌ Error retrieving courses:", error.message);
    throw error;
  }
};

// Update course by ID
export const updateCourse = async (req) => {
  const { id } = req.params;
  const { courseName, courseImg, trainer, startDate, duration } = req.body;

  // Fetch current course details to preserve unprovided fields
  const [existingRows] = await db.execute(
    "SELECT * FROM courses WHERE id = ?",
    [id]
  );

  if (existingRows.length === 0) {
    throw new Error("No course found with the specified ID");
  }

  const currentCourse = existingRows[0];

  // Build the update dynamically based on provided fields
  const updates = {};
  if (courseName !== undefined) updates.courseName = courseName;
  if (courseImg !== undefined) updates.courseImg = courseImg;
  if (trainer !== undefined) updates.trainer = trainer;
  if (startDate !== undefined) updates.startDate = startDate;
  if (duration !== undefined) updates.duration = duration;

  // If no fields to update, return early
  if (Object.keys(updates).length === 0) {
    return { id, affectedRows: 0, message: "No fields provided to update" };
  }

  // Construct the dynamic SQL query
  const setClause = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");

  const query = `
    UPDATE courses 
    SET ${setClause}
    WHERE id = ?;
  `;

  try {
    const [result] = await db.execute(query, [...Object.values(updates), id]);

    if (result.affectedRows === 0) {
      throw new Error("No course found with the specified ID");
    }

    return { id, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error updating course:", error.message);
    throw error;
  }
};

// Delete course by ID
export const deleteCourse = async (courseId) => {
  const query = `DELETE FROM courses WHERE id = ?;`;

  try {
    const [result] = await db.execute(query, [courseId]);
    return { affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error deleting course:", error.message);
    throw error;
  }
};

export const createCourseEnrollment = async (req) => {
  const { courseId, voluteerId } = req.body;

  const query = `
        INSERT INTO course_enrollments (
          enrollment_id, course_id,volunteer_id
        ) VALUES (?, ?, ?);
      `;

  try {
    const enrollment_id = generateId(); // Generate a unique ID

    // Execute the query
    const [result] = await db.execute(query, [
      enrollment_id,
      courseId,
      voluteerId,
    ]);

    return { id: courseId, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error creating course:", error.message);
    throw error;
  }
};
