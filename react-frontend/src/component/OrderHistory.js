import React, { useEffect, useState } from "react";
import { fetchOrderHistory } from "../api/ordersService";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orderData = await fetchOrderHistory();
        setOrders(orderData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <p>Loading order history...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Date:</strong> {order.orderDate}
              </p>
              <p>
                <strong>Total:</strong> ${order.totalAmount}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
