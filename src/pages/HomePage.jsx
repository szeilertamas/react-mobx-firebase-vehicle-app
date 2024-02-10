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
  const [sortingOption, setSortingOption] = useState("default");
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await vehicleStore.loadVehicleMakes();
        await vehicleStore.loadVehicleModels();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vehicleStore]);

  // Function to handle sort change
  const handleSortChange = (sortOption) => {
    setSortingOption(sortOption);
  };

  // Function to handle filter change
  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  // Function to handle resetting filter
  const handleResetFilter = () => {
    setFilterValue("");
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
        <Filtering
          onFilterChange={handleFilterChange}
          onResetFilter={handleResetFilter}
        />
        <Sorting onSortChange={handleSortChange} />
      </div>
      {/* Conditional rendering: if loading, display Loading component, otherwise display VehicleList */}
      {isLoading ? (
        <Loading />
      ) : (
        <VehicleList
          sortingOption={sortingOption}
          filterValue={filterValue}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}

export default HomePage;
