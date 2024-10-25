import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Store from '../Redux/Store';
import Routez from "./routez";

const { store, persistor } = Store();

const AppRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routez isAuthenticated={isAuthenticated} onLogin={handleLogin} />
      </PersistGate>
    </Provider>
  );
};

export default AppRoute;
