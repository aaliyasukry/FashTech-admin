import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute from './protectedRoute';
import Login from '../Components/Login/login';
import Dashboard from '../Components/Dashboard';
import Items from '../Components/Items';
import Variants from '../Components/Variants';
import Pieces from '../Components/Pieces';
import Category from '../Components/Category';
import Bags from '../Components/Bags';
import CheckoutComponent from '../Components/Checkout';

const Routez = ({ isAuthenticated, onLogin, onLogout }) => {
  const location = useLocation();
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('lastRoute', location.pathname);
    }
  }, [isAuthenticated, location]);

  const dashboardRoutes = {
    items: '/items',
    variants: '/variants',
    pieces: '/pieces',
    bags: '/bags',
    checkout: '/checkout',
    categories: '/categories',
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={onLogin} />} />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} routes={dashboardRoutes} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/categories' element={<Category/>}/>
        <Route path="/items" element={<Items />} />
        <Route path="/variants" element={<Variants />} />
        <Route path="/pieces" element={<Pieces />} />
        <Route path="/bags" element={<Bags/>} />
        <Route path="/checkout" element={<CheckoutComponent/>} />
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
    </Routes>
  );
};

export default Routez;