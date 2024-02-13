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
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await vehicleStore.loadVehicleMakes();
        await vehicleStore.loadPaginatedVehicleModels();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vehicleStore]);

  const handleSortChange = async (newSort) => {
    if (newSort === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOrder('asc');
      setSortBy(newSort);
    }
    await vehicleStore.loadVehicleModels({ search: filterValue, sortBy: newSort, sortOrder });
  };

  const handleFilterChange = async (filterValue) => {
    setFilterValue(filterValue); 
    await vehicleStore.loadVehicleModels({ search: filterValue, sortBy, sortOrder });
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
        <Filtering onFilterChange={handleFilterChange} />
        <Sorting onSortChange={handleSortChange} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <VehicleList filterValue={filterValue} sortBy={sortBy} sortOrder={sortOrder} />
        )}
    </div>
  );
}

export default HomePage;
