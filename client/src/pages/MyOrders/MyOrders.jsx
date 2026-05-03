import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from '../../api/axios';
import './MyOrders.css';

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    try {
      const response = await axios.get('/orders/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMyOrders();
  }, [token]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading orders...</p>;

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet!</p>
      ) : (
        orders.map((order) => (
          <div className='my-orders-order' key={order._id}>
            <p>🛒 <b>{order.items.length} item{order.items.length > 1 ? 's' : ''}</b></p>
            <p>${order.totalAmount}</p>
            <p>Payment: <span>{order.payment ? '✅ Done' : '⏳ Pending'}</span></p>
            <p>Status: <span className={`status ${order.status.replace(/ /g, '-').toLowerCase()}`}>{order.status}</span></p>
            <button onClick={fetchMyOrders}>Track Order</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;