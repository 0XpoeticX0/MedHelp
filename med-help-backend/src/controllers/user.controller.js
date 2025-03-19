import {
  createUser,
  deleteUser,
  getUsers,
  toggleBlockStatus,
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
