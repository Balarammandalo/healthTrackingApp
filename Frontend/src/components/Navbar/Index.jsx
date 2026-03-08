import React from "react";
import "./index.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Index = () => {

    const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");  
    navigate("/login");        
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
  <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>NOOM</Link> </div>
        <ul className="nav-links">
            <li><Link to="/activeDetails" style={{ textDecoration: "none", color: "Blue" }}>ACTIVITY</Link></li>
          <li><Link to="/dashboard" style={{ textDecoration: "none", color: "Blue" }}>DASHBOARD</Link></li>
        </ul>
        <div className="nav-right">
          <span className="login">
        <Link
          to="/login"
          onClick={handleLogout}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          LOGOUT
        </Link>
      </span>
        </div>
      </div>
    </nav>
  );
};

export default Index;