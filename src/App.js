import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from './pages/AddItem';
import AddCategory from './pages/AddCategory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={AddCategory}/>
        {/* <Route path='/' exact Component={AddItem}/> */}
      </Routes>
    </Router>
  );
}

export default App;
