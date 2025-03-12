import { loginUser } from "../models/user.model.js";

export const loginUserController = async (req, res) => {
  try {
    const result = await loginUser(req);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
