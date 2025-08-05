import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
};
