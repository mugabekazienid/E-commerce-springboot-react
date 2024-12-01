import React, { useState } from "react";
import { addCategory } from "../api/adminService";

const AddCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory({ name });
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategory;
