// src/pages/HomePage.jsx

import React, { useEffect, useState } from "react";
import VehicleList from "../components/VehicleList";
import AddVehicle from "../components/AddVehicle";
import Filtering from "../components/Filtering";
import Sorting from "../components/Sorting";
import { useRootStore } from "../stores/RootStore";
import Loading from "../components/Loading";
import Navbar from '../components/Navbar';

function HomePage() {
  const { vehicleStore } = useRootStore();
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await vehicleStore.loadVehicleMakes();
        await vehicleStore.loadVehicleModels({}, sortBy, sortOrder); // Pass sorting option
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vehicleStore, sortBy, sortOrder]); // Update dependency

  const handleSortChange = async (newSort) => {
    if (newSort === sortBy) {
      // Toggle sorting order if the same field is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending order if a new sorting field is selected
      setSortOrder('asc');
      setSortBy(newSort);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="container d-flex justify-content-between
        align-items-center px-3 mt-3"
        style={{ maxWidth: "80%" }}
      >
        <AddVehicle />
        <Filtering />
        <Sorting onSortChange={handleSortChange} />
      </div>
      {/* Conditional rendering: if loading, display Loading component, otherwise display VehicleList */}
      {isLoading ? (
        <Loading />
      ) : (
        <VehicleList />
      )}
    </div>
  );
}

export default HomePage;
