// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddVehiclePage from './pages/AddVehiclePage';
import EditVehiclePage from './pages/EditVehiclePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddVehiclePage />} />
          <Route path="/edit/:id" element={<EditVehiclePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
