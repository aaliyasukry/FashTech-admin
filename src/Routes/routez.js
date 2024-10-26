import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import Login from '../Components/Login/login';
import Dashboard from '../Components/Dashboard';
import Items from '../Components/Items';
import Variants from '../Components/Variants';

const Routez = ({ isAuthenticated, onLogin }) => {
  const dashboardRoutes = {
    items: '/items',
    variants: '/variants',
    pieces: '/pieces',
    bags: '/bags',
    checkout: '/checkout',
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={onLogin} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard routes={dashboardRoutes} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/items"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Items /> {/* Display the Items component */}
          </ProtectedRoute>
        }
      />
      <Route
        path="/variants"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Variants />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />}
      />
    </Routes>
  );
};

export default Routez;