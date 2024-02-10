// src/components/AddVehicle.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function AddVehicle() {
  return (
    <div className="mt-3 me-5">
      <Link to="/add" className="btn btn-primary">
        Add Vehicle
      </Link>
    </div>
  );
}

export default AddVehicle;
