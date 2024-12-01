import React, { useEffect, useState } from "react";
import {
  addToCart,
  getCartItems,
  removeCartItem,
  checkoutCart,
  payNow,
} from "../api/cartService";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await getCartItems();
        setCart(cartData.cartItems);
        setTotal(cartData.total);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleRemove = async (index) => {
    try {
      await removeCartItem(index);
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
    } catch (err) {
      alert("Error removing item: " + err);
    }
  };

  const handleCheckout = async () => {
    try {
      const checkoutData = await checkoutCart();
      alert(`Checkout successful. Total: $${checkoutData.total}`);
    } catch (err) {
      alert("Error during checkout: " + err);
    }
  };

  const handlePayment = async () => {
    try {
      const paymentResponse = await payNow();
      alert(`Payment successful: ${paymentResponse.result}`);
    } catch (err) {
      alert("Error processing payment: " + err);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <p>
                <strong>{item.name}</strong>
              </p>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total}</h3>
      <button onClick={handleCheckout}>Checkout</button>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Cart;
