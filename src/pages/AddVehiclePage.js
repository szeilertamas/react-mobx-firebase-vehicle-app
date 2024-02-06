// src/pages/AddVehiclePage.js

import React from "react";
import VehicleForm from "../components/VehicleForm";
import { useRootStore } from "../stores/RootStore";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

const AddVehiclePage = () => {
  const { vehicleStore } = useRootStore();
  const navigate = useNavigate();

  // Function to handle adding a new vehicle
  const handleAddVehicle = (formData) => {
    vehicleStore.addVehicle(formData); // Adding vehicle using vehicleStore
    navigate("/");
  };

  // Function to handle canceling adding a new vehicle
  const handleCancel = () => {
    navigate("/");
  };

  // Initial values for the form fields
  const initialValues = {
    make: "",
    model: "",
    year: "",
    price: "",
  };

  return (
    <div>
      <Navbar />
      {/* Displaying VehicleForm component with necessary props */}
      <VehicleForm
        onSubmit={handleAddVehicle} // Passing onSubmit function to handle form submission
        onCancel={handleCancel} // Passing onCancel function to handle form cancellation
        initialValues={initialValues} // Passing initial form values
      />
    </div>
  );
};

export default AddVehiclePage;
