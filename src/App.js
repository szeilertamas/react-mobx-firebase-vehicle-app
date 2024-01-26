// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddVehiclePage from './pages/AddVehiclePage';
import EditVehiclePage from './pages/EditVehiclePage';
import { firebaseApp } from './services/firebaseConfig';

function App() {

  useEffect(() => {
    console.log('Firebase App:', firebaseApp);
  }, []);

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
