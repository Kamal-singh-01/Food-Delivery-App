import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import axios from "../../../api/axios";
import "./OrdersList.css";

const OrdersList = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all delivertBoy

  const fetchDeliveryBoys = async () => {
    try {
      const response = await axios.get("/deliveryBoys");
      setDeliveryBoys(response.data.data);
    } catch (error) {
      console.error("Error in fetching delivery boy:", error);
    }
  };

  //  Update order status
  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await axios.put(
        `/orders/${orderId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        // Update status in UI instantly
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status } : order,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
      fetchDeliveryBoys();
    }
  }, [token]);

  if (loading) return <p className="loading">Loading orders...</p>;

  return (
    <div className="orders-list">
      <h2>Orders List</h2>
      <p className="orders-count">Total: {orders.length} orders</p>

      {orders.length === 0 ? (
        <p>No orders yet!</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            {/* Order Icon */}
            <p className="order-icon">📦</p>

            {/* Order Items */}
            <div className="order-items">
              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} x {item.quantity}
                  {index < order.items.length - 1 ? "," : ""}
                </p>
              ))}
            </div>

            {/* Customer Name */}
            <div className="order-address">
              <p>
                <b>
                  {order.address.firstName} {order.address.lastName}
                </b>
              </p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state}
              </p>
            </div>

            {/* Items count & Amount */}
            <div className="order-meta">
              <p>Items: {order.items.length}</p>
              <p>
                <b>${order.totalAmount}</b>
              </p>
            </div>

            {/* Status Dropdown */}
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className={`status-select ${order.status.replace(/ /g, "-").toLowerCase()}`}
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            {/* assign delivery boy*/}

            <select>
              <option value="">Select Delivery Boy</option>

              {deliveryBoys.map((boy) => (
                <option key={boy._id} value={boy._id}>
                  {boy.name}
                </option>
              ))}
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersList;
