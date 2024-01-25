// src/pages/EditVehiclePage.js

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";

const EditVehiclePage = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const fetchVehicleById = (id) => {
    console.log("Fetching Vehicle by ID:", id);
    return {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2022,
      price: 25000,
    };
  };

  const initialData = fetchVehicleById(vehicleId);

  const handleUpdateVehicle = (formData) => {
    console.log("Updating Vehicle:", vehicleId, formData);

    navigate("/");
  };

  const handleCancel = () => {
    console.log("Edit Vehicle canceled");

    navigate("/");
  };

  return (
    <div>
      <VehicleForm onSubmit={handleUpdateVehicle} onCancel={handleCancel} initialValues={initialData} />
    </div>
  );
};

export default EditVehiclePage;
