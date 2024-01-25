// src/pages/AddVehiclePage.js

import React from "react";
import VehicleForm from "../components/VehicleForm";
import { useNavigate } from "react-router-dom";

const AddVehiclePage = () => {
  const navigate = useNavigate();

  const handleAddVehicle = (formData) => {
    console.log("Adding Vehicle:", formData);

    navigate("/");
  };

  const handleCancel = () => {
    console.log("Add Vehicle canceled");

    navigate("/");
  };

  return (
    <div>
      <VehicleForm onSubmit={handleAddVehicle} onCancel={handleCancel} />
    </div>
  );
};

export default AddVehiclePage;
