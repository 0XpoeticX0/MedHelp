import {
  createTrainer,
  deleteTrainerById,
  editTrainerById,
  getTrainers,
} from "../models/trainer.model.js";

// Create new user
export const createTrainerController = async (req, res) => {
  try {
    await createTrainer(req);
    res.status(201).json({ message: "Trainer created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users
export const getTrainerController = async (req, res) => {
  try {
    const result = await getTrainers();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editTrainerController = async (req, res) => {
  try {
    const result = await editTrainerById(req);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTrainerController = async (req, res) => {
  try {
    const result = await deleteTrainerById(req);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
