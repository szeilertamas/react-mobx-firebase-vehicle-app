// src/pages/EditVehiclePage.js

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";
import { useRootStore } from "../stores/RootStore";

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicleStore } = useRootStore();

  const vehicleId = parseInt(id);

  const initialData = vehicleStore.getVehicleById(vehicleId);

  const handleUpdateVehicle = (formData) => {
    vehicleStore.updateVehicle(vehicleId, formData);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <VehicleForm
        onSubmit={handleUpdateVehicle}
        onCancel={handleCancel}
        initialValues={initialData}
      />
    </div>
  );
};

export default EditVehiclePage;
