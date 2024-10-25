import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ routes }) => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-buttons">
        <button onClick={() => handleButtonClick(routes.items)}>Items</button>
        <button onClick={() => handleButtonClick(routes.variants)}>Variants</button>
        <button onClick={() => handleButtonClick(routes.pieces)}>Pieces</button>
        <button onClick={() => handleButtonClick(routes.bags)}>Bags</button>
        <button onClick={() => handleButtonClick(routes.checkout)}>Checkout</button>
      </div>
    </div>
  );
};

export default Dashboard;
