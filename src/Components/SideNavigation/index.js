import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiLogOut
} from "react-icons/fi";
import {
  IoBagOutline,
  IoLayersOutline,
  IoShirtOutline
} from "react-icons/io5";
import { BsFillClipboardCheckFill, BsTags } from "react-icons/bs";
import { RiFilePaper2Fill } from "react-icons/ri";

const SideNavigation = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo">
          <i className="bx bx-menu menu-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}></i>
          <span className="logo-name">FashTech</span>
        </div>

        <div className="sidebar-content">
          <ul className="lists">
            <li className="list" onClick={() => handleNavigation("/dashboard")}>
              <a className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}>
                <FiHome className="icon" />
                <span className="link">Dashboard</span>
              </a>
            </li>
            <li className="list" onClick={() => handleNavigation("/categories")}>
              <a className={`nav-link ${location.pathname === "/categories" ? "active" : ""}`}>
                <RiFilePaper2Fill className="icon" />
                <span className="link">Category</span>
              </a>
            </li>
            <li className="list" onClick={() => handleNavigation("/items")}>
              <a className={`nav-link ${location.pathname === "/items" ? "active" : ""}`}>
                <IoShirtOutline className="icon" />
                <span className="link">Items</span>
              </a>
            </li>
            <li className="list" onClick={() => handleNavigation("/variants")}>
              <a className={`nav-link ${location.pathname === "/variants" ? "active" : ""}`}>
                <IoLayersOutline className="icon" />
                <span className="link">Variants</span>
              </a>
            </li>
            <li className="list" onClick={() => handleNavigation("/pieces")}>
              <a className={`nav-link ${location.pathname === "/pieces" ? "active" : ""}`}>
                <BsTags className="icon" />
                <span className="link">Pieces</span>
              </a>
            </li>
            <li className="list" onClick={() => handleNavigation("/bags")}>
              <a className={`nav-link ${location.pathname === "/bags" ? "active" : ""}`}>
                <IoBagOutline className="icon" />
                <span className="link">Bags</span>
              </a>
            </li>
            <li className="list" onClick={() => handleNavigation("/checkout")}>
              <a className={`nav-link ${location.pathname === "/checkout" ? "active" : ""}`}>
                <FiShoppingCart className="icon" />
                <span className="link">Checkout</span>
              </a>
            </li>
            <li className="list" onClick={() => handleNavigation("/logout")}>
              <a className={`nav-link ${location.pathname === "/logout" ? "active" : ""}`}>
                <FiLogOut className="icon" />
                <span className="link">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default SideNavigation;