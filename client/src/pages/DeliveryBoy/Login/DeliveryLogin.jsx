import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import axios from '../../../api/axios';

const DeliveryLogin = () => {
  const { setToken, setUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/auth/login', formData);
      const { token, user } = response.data;

      // ✅ Only delivery role can login here
      if (user.role !== 'delivery') {
        setError('Access denied! Only delivery boys can login here.');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);

      navigate('/delivery/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-4xl mb-2">🛵</p>
          <h2 className="text-2xl font-bold text-gray-800">Delivery Boy Login</h2>
          <p className="text-gray-500 text-sm mt-1">Login to see your assigned orders</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-tomato focus:ring-1 focus:ring-red-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login 🚀'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default DeliveryLogin;