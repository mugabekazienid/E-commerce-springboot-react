import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8031/api/orders", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
}); // Ensure axios instance is configured as before

// Fetch order history for the logged-in user
export const fetchOrderHistory = async () => {
  try {
    const response = await api.get("/orders/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error.response?.data || "An error occurred while fetching orders.";
  }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Replace with your token management logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
