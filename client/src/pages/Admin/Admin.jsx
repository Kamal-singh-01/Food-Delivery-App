import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddFood from './AddFood/AddFood';
import FoodList from './FoodList/FoodList';
import OrdersList from './OrdersList/OrdersList';
import Messages from './Messages/Messages'; 
import './Admin.css';

const Admin = () => {
  const { user } = useContext(StoreContext);

  if (!user || user.role !== 'admin') {
    return (
      <div className='admin-denied'>
        <h2>🚫 Access Denied</h2>
        <p>You need admin privileges to access this page.</p>
      </div>
    );
  }

  return (
    <div className='admin'>
      <Sidebar />
      <div className='admin-content'>
        <Routes>
          <Route path='/' element={<Navigate to='/admin/add-food' />} />
          <Route path='add-food' element={<AddFood />} />
          <Route path='food-list' element={<FoodList />} />
          <Route path='orders' element={<OrdersList />} />
          <Route path='messages' element={<Messages />} />  
        </Routes>
      </div>
    </div>
  );
};

export default Admin;