import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Index = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }

    try {

      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.token) {
        Cookies.set("token", data.token, { expires: 7 });
        navigate("/");
      } else {
        setError("Token not received from server");
      }

    } catch (error) {
      console.error("Login Error:", error);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="Login_page">
      <div className="login-container">
        <div>
          <div className="welcome-section">
            <h1>Welcome Back</h1>
            <p>Log in to monitor your health data and insights</p>
          </div>

          <div className="form-section">

            <label>
              <p>Email Address</p>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </label>

            <label>
              <p>Password</p>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </label>

            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>
                {error}
              </p>
            )}

            <div className="forgot-password">
              <button type="button">Forgot Password?</button>
            </div>

            <button className="login-btn" onClick={handleLogin}>
              Log In
            </button>

          </div>

          <div className="signup-section">
            <p>
              Don't have an account?
              <Link
                to="/signup"
                className="signup-btn"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign Up
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Index;