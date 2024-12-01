import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8031/api/password", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post("/password/forgot", null, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw (
      error.response?.data ||
      "An error occurred while requesting password reset."
    );
  }
};

// Validate reset token
export const validateResetToken = async (token) => {
  try {
    const response = await api.get("/password/reset", { params: { token } });
    return response.data;
  } catch (error) {
    console.error("Error validating token:", error);
    throw error.response?.data || "Invalid or expired token.";
  }
};

// Reset password
export const resetPassword = async (token, password) => {
  try {
    const response = await api.post("/password/reset", null, {
      params: { token, password },
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error.response?.data || "Failed to reset password.";
  }
};
