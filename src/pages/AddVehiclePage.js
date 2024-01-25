// src/pages/AddVehiclePage.js

import React from "react";
import VehicleForm from "../components/VehicleForm";
import { useRootStore } from "../stores/RootStore";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <VehicleForm onSubmit={handleAddVehicle} onCancel={handleCancel} />
    </div>
  );
};

export default AddVehiclePage;
