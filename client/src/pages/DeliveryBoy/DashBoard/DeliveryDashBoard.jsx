import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import axios from '../../../api/axios';

const DeliveryDashboard = () => {
  const { token, user, logout } = useContext(StoreContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch assigned orders
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

  // ✅ Update order status
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
    if (!token) {
      navigate('/delivery/login');
      return;
    }
    fetchAssignedOrders();
  }, [token]);

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Preparing': return 'bg-blue-100 text-blue-700';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-2xl">🛵</p>
          <h1 className="text-xl font-bold text-gray-800">Delivery Panel</h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">Hi, <b>{user?.name}</b> 👋</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total Assigned</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-purple-600">
              {orders.filter(o => o.status === 'Out for Delivery').length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Out for Delivery</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.status === 'Delivered').length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Delivered</p>
          </div>
        </div>

        {/* Orders */}
        <h2 className="text-lg font-bold text-gray-700 mb-4">Assigned Orders</h2>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500">No orders assigned yet!</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm p-5 mb-4">

              {/* Order Header */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-400">
                  Order ID: <span className="font-mono text-gray-600">{order._id.slice(-8).toUpperCase()}</span>
                </p>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Customer Address */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold text-gray-700 mb-1">📍 Delivery Address</p>
                <p className="text-sm text-gray-600">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-sm text-gray-600">{order.address.street}</p>
                <p className="text-sm text-gray-600">
                  {order.address.city}, {order.address.state} - {order.address.zipCode}
                </p>
                <p className="text-sm text-gray-600">📞 {order.address.phone}</p>
              </div>

              {/* Order Items */}
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700 mb-1">🛒 Items</p>
                {order.items.map((item, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    • {item.name} x {item.quantity}
                  </p>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-bold text-gray-800">${order.totalAmount}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {order.status === 'Preparing' && (
                  <button
                    onClick={() => handleStatusUpdate(order._id, 'Out for Delivery')}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-semibold transition"
                  >
                    🛵 Out for Delivery
                  </button>
                )}
                {order.status === 'Out for Delivery' && (
                  <button
                    onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold transition"
                  >
                    ✅ Mark as Delivered
                  </button>
                )}
                {order.status === 'Delivered' && (
                  <p className="text-green-600 font-semibold text-sm">
                    ✅ Order Delivered Successfully!
                  </p>
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