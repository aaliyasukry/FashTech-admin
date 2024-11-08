import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedLayout from '../Components/ProtectedLayout/index';

const lastRoute = localStorage.getItem('lastRoute') || '/';
const ProtectedRoute = ({ isAuthenticated, children, routes }) => {
  return isAuthenticated ? (
    <ProtectedLayout routes={routes}>
      {children}
    </ProtectedLayout>
  ) : (
    <Navigate to="/" />
  );
};
export default ProtectedRoute;