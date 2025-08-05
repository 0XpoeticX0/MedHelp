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
      await axiosClient.post("/users", userData);

      //   console.log("✅ User created successfully:", response.data);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create user",
        loading: false,
      });
    }
  },

  // Reset Store
  //   resetUser: () => set({ user: null, loading: false, error: null }),
}));
