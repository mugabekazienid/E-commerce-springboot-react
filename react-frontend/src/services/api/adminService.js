import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8031/api/admin", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Categories API
export const fetchCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const addCategory = async (category) => {
  const response = await api.post("/categories", category);
  return response.data;
};

export const updateCategory = async (id, updatedCategory) => {
  const response = await api.put(`/categories/${id}`, updatedCategory);
  return response.data;
};

export const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}`);
};

// Products API
export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const addProduct = async (productDTO, imageFile) => {
  const formData = new FormData();
  formData.append("product", JSON.stringify(productDTO));
  if (imageFile) {
    formData.append("imageProduct", imageFile);
  }
  const response = await api.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProduct = async (id, updatedProductDTO) => {
  const response = await api.put(`/products/${id}`, updatedProductDTO);
  return response.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

// Users API
export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
