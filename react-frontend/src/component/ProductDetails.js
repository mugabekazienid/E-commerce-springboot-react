import React, { useEffect, useState } from "react";
import { fetchProductDetails } from "../api/homeService";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await fetchProductDetails(productId);
        setProduct(data.product);
        setCartCount(data.cartCount);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    getProductDetails();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Weight: {product.weight} kg</p>
      <p>Description: {product.description}</p>
      <p>Items in Cart: {cartCount}</p>
    </div>
  );
};

export default ProductDetails;
