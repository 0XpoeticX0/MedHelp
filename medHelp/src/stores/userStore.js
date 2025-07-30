import { create } from "zustand";
import axiosClient from "../api/axiosClient";

// Zustand store
export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // Create User
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post("/users", userData);

      console.log("✅ User created successfully:", response.data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to create user";

      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
}));
