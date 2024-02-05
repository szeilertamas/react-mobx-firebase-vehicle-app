// src/pages/EditVehiclePage.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";
import Loading from "../components/Loading";
import { useRootStore } from "../stores/RootStore";

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicleStore } = useRootStore();

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await vehicleStore.loadVehicleModels();
        await vehicleStore.loadVehicleMakes();

        const initialData = vehicleStore.getVehicleById(id);

        if (!initialData) {
          console.error(`Vehicle with ID ${id} not found.`);
          navigate("/");
          return;
        }

        const initialMakeId = initialData.makeId;
        const initialMakeDocument = await vehicleStore.getMakeById(initialMakeId);

        setInitialValues({
          ...initialData,
          model: initialData.name || "",
          make: initialMakeDocument?.name || "",
          makeId: initialMakeId || "",
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate("/");
      }
    };

    fetchData();
  }, [vehicleStore, navigate, id]);

  if (loading) {
    return <Loading />;
  }

  if (!initialValues) {
    console.error(`Initial values not available.`);
    navigate("/");
    return null;
  }

  const handleUpdateVehicle = async (formData) => {
    await vehicleStore.loadVehicleMakes();
  
    const selectedMake = vehicleStore.vehicleMakes.find((make) => make.name === formData.make);
  
    if (selectedMake) {
      formData.makeId = selectedMake.id;
    }
  
    vehicleStore.updateVehicle(id, formData);
  
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
