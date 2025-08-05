import {
  createUser,
  deleteUser,
  getUsers,
  getVolunteerAvailability,
  toggleBlockStatus,
  updateVolunteerAvailability,
} from "../models/user.model.js";

// Create new user
export const createUserController = async (req, res) => {
  try {
    await createUser(req);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users
export const getUsersController = async (req, res) => {
  try {
    const users = await getUsers(req);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUsersController = async (req, res) => {
  try {
    await deleteUser(req);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleUserStatusController = async (req, res) => {
  try {
    await toggleBlockStatus(req);
    res.status(200).json({
      message: "User status is changed successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const volunteerAvailabilityController = async (req, res) => {
  try {
    const { isAvailable, latitude, longitude } = req.body;
    const volunteerId = req.user.id;

    // Update availability in the database
    await updateVolunteerAvailability(
      volunteerId,
      isAvailable,
      latitude,
      longitude
    );

    res.status(200).json({ message: "Availability updated successfully" });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVolunteerAvailabilityController = async (req, res) => {
  try {
    const volunteerId = req.user.id;

    // Fetch availability from the database
    const availability = await getVolunteerAvailability(volunteerId);

    res.status(200).json(availability);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
