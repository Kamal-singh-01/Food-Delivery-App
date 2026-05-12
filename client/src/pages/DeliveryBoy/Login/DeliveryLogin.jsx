import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import axios from '../../../api/axios';
import './DeliveryLogin.css';

const DeliveryLogin = () => {
  const { setToken, setUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

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
    <div className="delivery-login">
      <div className="delivery-login-box">
        <div className="delivery-login-header">
          <p className="delivery-icon">🛵</p>
          <h2>Delivery Boy Login</h2>
          <p>Login to see your assigned orders</p>
        </div>

        <form onSubmit={handleSubmit} className="delivery-login-form">
          <div className="delivery-form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="delivery-form-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="delivery-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryLogin;