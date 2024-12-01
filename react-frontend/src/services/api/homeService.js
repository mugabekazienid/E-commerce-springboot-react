import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8031/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Fetch home data (cart count)
export const fetchHomeData = async () => {
  const response = await api.get("/home");
  return response.data;
};

// Fetch shop data (categories and products)
export const fetchShopData = async () => {
  const response = await api.get("/shop");
  return response.data;
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryId) => {
  const response = await api.get(`/shop/category/${categoryId}`);
  return response.data;
};

// Fetch product details by ID
export const fetchProductDetails = async (productId) => {
  const response = await api.get(`/shop/viewproduct/${productId}`);
  return response.data;
};
