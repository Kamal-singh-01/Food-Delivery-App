import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { assets } from "./../assets/assets";
import "./Navbar/Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false); // toggle search bar
  const { getTotalCartAmount, user, logout, search, setSearch } =
    useContext(StoreContext);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="log" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt=""
          onClick={() => {
            setShowSearch(!showSearch);
            setSearch("");
          }}
           style={{ cursor: 'pointer' }}
        />
         {/* {show when user click on search icon} */}
        {showSearch && (
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {search && (
              <span onClick={() => setSearch('')} className="clear-search">✕</span>
            )}
          </div>
        )}

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* Show sign in OR username + logout based on login state */}
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
