import {
  createCourse,
  createCourseEnrollment,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../models/course.model.js";

// Create new user
export const createCourseController = async (req, res) => {
  try {
    await createCourse(req);
    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourseController = async (req, res) => {
  try {
    const result = await getCourses();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCourseController = async (req, res) => {
  try {
    const result = await updateCourse(req);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const result = await deleteCourse(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCourseEnrollmentController = async (req, res) => {
  try {
    await createCourseEnrollment(req);
    res.status(201).json({ message: "Successfully Course enrolled." });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
