import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../Redux/Store';
import Routez from "./routez";

const AppRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const lastRoute = localStorage.getItem('lastRoute') || '/';
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      navigate(lastRoute);
    }
  }, [navigate]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Provider store={store}> {/* Wrap with Provider using store */}
      <PersistGate loading={null} persistor={persistor}>
        <Routez
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </PersistGate>
    </Provider>
  );
};

export default AppRoute;
