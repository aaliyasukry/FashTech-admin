import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiShoppingCart, FiFileText, FiUserCheck, FiBarChart2 } from "react-icons/fi";

const SideNavigation = ({ children }) => {
  const [showMenu, setShowMenu] = useState(window.innerWidth <= 1050);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setShowMenu(window.innerWidth <= 1050);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth <= 600) setShowMenu(true);
  };

  return (
    <div>
      <div className="left-sidenav">
        <h1>App Name</h1>
        <ul className="sidenav-menu">
          <li className={location.pathname === "/dashboard" ? "active" : ""} onClick={() => handleNavigation("/dashboard")}>
            <FiHome className="icon" /> {!showMenu && <span>Dashboard</span>}
          </li>
          <li className={location.pathname === "/store-list" ? "active" : ""} onClick={() => handleNavigation("/store-list")}>
            <FiShoppingCart className="icon" /> {!showMenu && <span>Store List</span>}
          </li>
          <li className={location.pathname === "/order-detail" ? "active" : ""} onClick={() => handleNavigation("/order-detail")}>
            <FiFileText className="icon" /> {!showMenu && <span>Order Detail</span>}
          </li>
          <li className={location.pathname === "/customer" ? "active" : ""} onClick={() => handleNavigation("/customer")}>
            <FiUserCheck className="icon" /> {!showMenu && <span>Customer</span>}
          </li>
          <li className={location.pathname === "/report" ? "active" : ""} onClick={() => handleNavigation("/report")}>
            <FiBarChart2 className="icon" /> {!showMenu && <span>Analytics</span>}
          </li>
        </ul>
        <footer>&copy; 2024 Your Company. All rights reserved.</footer>
      </div>
      <div className="page-wrapper" style={{ marginLeft: showMenu ? "60px" : "200px" }}>
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default SideNavigation;
