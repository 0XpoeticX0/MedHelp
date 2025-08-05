import {
  createCourse,
  createEnrollment,
  deleteCourse,
  getAvailableCourseForCertificate,
  getCourses,
  getCoursesByVolunteer,
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

export const createEnrollmentController = async (req, res) => {
  try {
    await createEnrollment(req);
    res.status(201).json({ message: "Enrollment successfull" });
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

export const getCoursesByVolunteerController = async (req, res) => {
  try {
    const v_id = req.user.id;

    const result = await getCoursesByVolunteer(v_id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAvailableCourseForCertificateController = async (req, res) => {
  try {
    const v_id = req.user.id;

    const result = await getAvailableCourseForCertificate(v_id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
