import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to='/admin/add-food' className={({isActive}) => isActive ? 'sidebar-option active' : 'sidebar-option'}>
          <p>➕ Add Food</p>
        </NavLink>
        <NavLink to='/admin/food-list' className={({isActive}) => isActive ? 'sidebar-option active' : 'sidebar-option'}>
          <p>🍔 Food List</p>
        </NavLink>
        <NavLink to='/admin/orders' className={({isActive}) => isActive ? 'sidebar-option active' : 'sidebar-option'}>
          <p>📦 Orders</p>
        </NavLink>
        {/* ✅ new */}
        <NavLink to='/admin/messages' className={({isActive}) => isActive ? 'sidebar-option active' : 'sidebar-option'}>
          <p>✉️ Messages</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;