import './App.css';
import './styles/style.css'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoute from './Routes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Components/AuthContext/index';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoute />
        <ToastContainer
          className="toast-container"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </Router>
  );
};

export default App;
