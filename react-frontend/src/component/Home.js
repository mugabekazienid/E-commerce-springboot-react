import React, { useEffect, useState } from "react";
import { fetchHomeData } from "../api/homeService";

const Home = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const data = await fetchHomeData();
        setCartCount(data.cartCount);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    getHomeData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Shop</h1>
      <p>Items in Cart: {cartCount}</p>
    </div>
  );
};

export default Home;
