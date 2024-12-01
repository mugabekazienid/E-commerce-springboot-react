import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8031/api/auth", // Base URL for LoginController
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Login User
export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

// Fetch Registration Page Status
export const getRegisterPage = async () => {
  const response = await api.get("/register");
  return response.data;
};

// Register User
export const registerUser = async (userDetails) => {
  const response = await api.post("/register", userDetails);
  return response.data;
};
