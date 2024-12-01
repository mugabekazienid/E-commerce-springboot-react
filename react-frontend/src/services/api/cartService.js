import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8031/api/cart", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a product to the cart
export const addToCart = async (productId) => {
  try {
    const response = await api.post(`/cart/add/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw (
      error.response?.data || "An error occurred while adding product to cart."
    );
  }
};

// Get all cart items
export const getCartItems = async () => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw (
      error.response?.data || "An error occurred while fetching cart items."
    );
  }
};

// Remove an item from the cart
export const removeCartItem = async (index) => {
  try {
    const response = await api.delete(`/cart/remove/${index}`);
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error.response?.data || "An error occurred while removing cart item.";
  }
};

// Checkout the cart
export const checkoutCart = async () => {
  try {
    const response = await api.get("/cart/checkout");
    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error.response?.data || "An error occurred during checkout.";
  }
};

// Process payment
export const payNow = async () => {
  try {
    const response = await api.post("/cart/payNow");
    return response.data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error.response?.data || "An error occurred during payment.";
  }
};

// Add item and place order
export const addToCartAndOrder = async (productId) => {
  try {
    const response = await api.post(`/cart/addAndOrder/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding product and placing order:", error);
    throw error.response?.data || "An error occurred while placing order.";
  }
};
