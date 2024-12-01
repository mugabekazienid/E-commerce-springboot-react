import React, { useEffect, useState } from "react";
import { fetchShopData, fetchProductsByCategory } from "../api/homeService";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getShopData = async () => {
      try {
        const data = await fetchShopData();
        setCategories(data.categories);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    getShopData();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    try {
      const data = await fetchProductsByCategory(categoryId);
      setProducts(data.products);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  return (
    <div>
      <h1>Shop</h1>
      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Shop;
