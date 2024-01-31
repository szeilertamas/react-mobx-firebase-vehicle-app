// src/pages/HomePage.js

import React, { useEffect, useState } from 'react';
import VehicleList from '../components/VehicleList';
import AddVehicle from '../components/AddVehicle';
import Filtering from '../components/Filtering';
import Sorting from '../components/Sorting';
import { useRootStore } from '../stores/RootStore';

function HomePage() {
  const { vehicleStore } = useRootStore();
  const [sortingOption, setSortingOption] = useState('default');

  useEffect(() => {
    vehicleStore.loadVehicleMakes();
    vehicleStore.loadVehicleModels();
  }, [vehicleStore]);

  const handleSortChange = (sortOption) => {
    setSortingOption(sortOption);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 ms-2 h2 text-light" style={{ fontSize: '1.5rem' }}>
            AutoConnect
          </span>
        </div>
      </nav>
      <div
        className="container d-flex justify-content-between
        align-items-center px-3 mt-3"
        style={{ maxWidth: '80%' }}
      >
        <AddVehicle />
        <Filtering />
        <Sorting onSortChange={handleSortChange} />
      </div>
      <VehicleList sortingOption={sortingOption} />
    </div>
  );
}

export default HomePage;
