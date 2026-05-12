import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import axios from '../../../api/axios';
import './DeliveryDashboard.css';

const DeliveryDashboard = () => {
  const { token, user, logout } = useContext(StoreContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignedOrders = async () => {
    try {
      const response = await axios.get('/orders/assigned', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const response = await axios.put(`/orders/${orderId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setOrders(orders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/delivery/login');
  };

  useEffect(() => {
    if (!token) { navigate('/delivery/login'); return; }
    fetchAssignedOrders();
  }, [token]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Preparing': return 'status-preparing';
      case 'Out for Delivery': return 'status-out';
      case 'Delivered': return 'status-delivered';
      default: return '';
    }
  };

  return (
    <div className="delivery-dashboard">

      {/* Navbar */}
      <div className="delivery-navbar">
        <div className="delivery-navbar-left">
          <p>🛵</p>
          <h1>Delivery Panel</h1>
        </div>
        <div className="delivery-navbar-right">
          <p>Hi, <b>{user?.name}</b> 👋</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Content */}
      <div className="delivery-content">

        {/* Stats */}
        <div className="delivery-stats">
          <div className="stat-card">
            <h2>{orders.length}</h2>
            <p>Total Assigned</p>
          </div>
          <div className="stat-card">
            <h2 className="purple">{orders.filter(o => o.status === 'Out for Delivery').length}</h2>
            <p>Out for Delivery</p>
          </div>
          <div className="stat-card">
            <h2 className="green">{orders.filter(o => o.status === 'Delivered').length}</h2>
            <p>Delivered</p>
          </div>
        </div>

        <h2 className="section-title">Assigned Orders</h2>

        {loading ? (
          <p className="loading">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <p>📭</p>
            <p>No orders assigned yet!</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">

              {/* Order Header */}
              <div className="order-header">
                <p>Order ID: <span>{order._id.slice(-8).toUpperCase()}</span></p>
                <span className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Address */}
              <div className="order-address">
                <p className="section-label">📍 Delivery Address</p>
                <p>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state} - {order.address.zipCode}</p>
                <p>📞 {order.address.phone}</p>
              </div>

              {/* Items */}
              <div className="order-items">
                <p className="section-label">🛒 Items</p>
                {order.items.map((item, index) => (
                  <p key={index}>• {item.name} x {item.quantity}</p>
                ))}
              </div>

              {/* Total */}
              <div className="order-total">
                <p>Total Amount</p>
                <b>${order.totalAmount}</b>
              </div>

              {/* Buttons */}
              <div className="order-actions">
                {order.status === 'Preparing' && (
                  <button className="btn-out" onClick={() => handleStatusUpdate(order._id, 'Out for Delivery')}>
                    🛵 Out for Delivery
                  </button>
                )}
                {order.status === 'Out for Delivery' && (
                  <button className="btn-delivered" onClick={() => handleStatusUpdate(order._id, 'Delivered')}>
                    ✅ Mark as Delivered
                  </button>
                )}
                {order.status === 'Delivered' && (
                  <p className="delivered-text">✅ Order Delivered Successfully!</p>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;