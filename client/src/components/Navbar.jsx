import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { assets } from './../assets/assets';
import './Navbar/Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, user, logout } = useContext(StoreContext); // ✅ get user & logout

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="log" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* ✅ Show sign in OR username + logout based on login state */}
        {user ? (
          <div className="navbar-profile">
            <p>Hi, {user.name} 👋</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        )}

      </div>
    </div>
  );
};

export default Navbar;