import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopup.css";
import axios from "../../api/axios";

import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

export const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setToken, setUser } = useContext(StoreContext);

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error on typing
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;

      if (currState === "Sign Up") {
        // Register API call
        response = await axios.post("/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Login API call
        response = await axios.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
      }

      // Save token to localStorage
     
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setToken(response.data.token);
      setUser(response.data.user);

      console.log("Success:", response.data);

      // Close popup on success
      setShowLogin(false);
    } catch (err) {
      // Show error message from backend
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Show error message */}
        {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : currState === "Sign Up"
              ? "Create account"
              : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};
