// src/components/HomePage.js

import React from "react";
import VehicleList from "../components/VehicleList";
import AddVehicle from "../components/AddVehicle";
import Filtering from "../components/Filtering";
import Sorting from "../components/Sorting";

function HomePage() {
  return (
    <div>
      <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 ms-2 h2 text-light" style={{ fontSize: "1.5rem" }}>
            AutoConnect
          </span>
        </div>
      </nav>
      <div
        className="container d-flex justify-content-between align-items-center px-3 mt-3"
        style={{ maxWidth: "80%" }}
      >
        <AddVehicle />
        <Filtering />
        <Sorting />
      </div>
      <VehicleList />
    </div>
  );
}

export default HomePage;
