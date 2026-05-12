import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { LoginPopup } from "./components/LoginPopup/LoginPopup";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Order from "./pages/PlaceOrder/Order";
import MyOrders from "./pages/MyOrders/MyOrders";
import Admin from "./pages/Admin/Admin";
import Contact from "./pages/Contact/Contact";
import DeliveryLogin from "./pages/DeliveryBoy/Login/DeliveryLogin";
import DeliveryDashboard from "./pages/DeliveryBoy/Dashboard/DeliveryDashboard";

const App = () => {
  //display popup for login
  const [showLogin, setShowLogin] = useState(false);
  const isDeliveryPage = window.location.pathname.startsWith("/delivery");
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/delivery/login" element={<DeliveryLogin />} />
          <Route
            path="/delivery/dashboard"
            element={<DeliveryDashboard />}
          />
        </Routes>
      </div>
        {!isDeliveryPage && <Footer />}
    </>
  );
};

export default App;
