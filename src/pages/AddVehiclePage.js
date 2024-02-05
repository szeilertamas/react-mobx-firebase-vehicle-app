// src/pages/AddVehiclePage.js

import React from "react";
import VehicleForm from "../components/VehicleForm";
import { useRootStore } from "../stores/RootStore";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

const AddVehiclePage = () => {
  const { vehicleStore } = useRootStore();
  const navigate = useNavigate();

  const handleAddVehicle = (formData) => {
    vehicleStore.addVehicle(formData);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const initialValues = {
    make: "",
    model: "",
    year: "",
    price: "",
  };

  return (
    <div>
      <Navbar />
      <VehicleForm
        onSubmit={handleAddVehicle}
        onCancel={handleCancel}
        initialValues={initialValues}
      />
    </div>
  );
};

export default AddVehiclePage;
