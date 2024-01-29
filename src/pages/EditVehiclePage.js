// src/pages/EditVehiclePage.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";
import { useRootStore } from "../stores/RootStore";

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicleStore } = useRootStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await vehicleStore.loadVehicleModels();
      await vehicleStore.loadVehicleMakes();
      const initialData = vehicleStore.getVehicleById(id);
      if (!initialData) {
        console.error(`Vehicle with ID ${id} not found.`);
        navigate("/");
        return;
      }

      setLoading(false);
    };

    fetchData();
  }, [vehicleStore, navigate, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const initialData = vehicleStore.getVehicleById(id);

  if (!initialData) {
    console.error(`Vehicle with ID ${id} not found.`);
    navigate("/");
    return null;
  }

  const initialMakeId = initialData.makeId;

  const initialMake = vehicleStore.vehicleMakes.find((make) => make.id === initialMakeId);

  const initialModel = vehicleStore.vehicleModels.find(
    (model) => model.makeId === initialMakeId
  );

  const initialValues = {
    ...initialData,
    model: initialModel?.name || "",
    make: initialMake?.name || "",
    makeId: initialMake?.id || "",
  };

  const handleUpdateVehicle = async (formData) => {
    await vehicleStore.loadVehicleMakes();

    const selectedMake = vehicleStore.vehicleMakes.find((make) => make.name === formData.make);

    if (selectedMake) {
      formData.makeId = selectedMake.id;
    }

    await vehicleStore.updateVehicle(id, formData);

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
        initialValues={initialValues}
        makes={vehicleStore.vehicleMakes}
        models={vehicleStore.vehicleModels}
      />
    </div>
  );
};

export default EditVehiclePage;
