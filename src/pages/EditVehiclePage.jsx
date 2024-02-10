// src/pages/EditVehiclePage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";
import Loading from "../components/Loading";
import { useRootStore } from "../stores/RootStore";
import Navbar from '../components/Navbar';

const EditVehiclePage = () => {
  const { id } = useParams(); // Getting id parameter from URL
  const navigate = useNavigate(); // Initializing navigate function using useNavigate hook
  const { vehicleStore } = useRootStore(); // Accessing vehicleStore from RootStore

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null); // State to manage initial form values

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await vehicleStore.loadVehicleModels();
        await vehicleStore.loadVehicleMakes();

        const initialData = vehicleStore.getVehicleById(id); // Getting initial data for the vehicle by ID

        if (!initialData) {
          console.error(`Vehicle with ID ${id} not found.`); // Logging error if vehicle not found
          navigate("/");
          return;
        }

        const initialMakeId = initialData.makeId; // Getting initial make ID
        const initialMakeDocument = await vehicleStore.getMakeById(initialMakeId); // Getting make document by ID

        // Setting initial form values with retrieved data
        setInitialValues({
          ...initialData,
          model: initialData.name || "",
          make: initialMakeDocument?.name || "",
          makeId: initialMakeId || "",
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        navigate("/");
      }
    };

    fetchData();
  }, [vehicleStore, navigate, id]);

  // Function to handle updating vehicle
  const handleUpdateVehicle = async (formData) => {
    await vehicleStore.loadVehicleMakes();

    const selectedMake = vehicleStore.vehicleMakes.find((make) => make.name === formData.make); // Finding selected make from store

    if (selectedMake) {
      formData.makeId = selectedMake.id; // Setting make ID in form data
    }

    vehicleStore.updateVehicle(id, formData); // Updating vehicle using vehicleStore

    navigate("/");
  };

  // Function to handle canceling editing
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      {/* Conditional rendering: if loading, display Loading component, otherwise display VehicleForm */}
      {loading ? (
        <Loading />
      ) : (
        <VehicleForm
          onSubmit={handleUpdateVehicle} // Passing onSubmit function to handle form submission
          onCancel={handleCancel} // Passing onCancel function to handle form cancellation
          initialValues={initialValues} // Passing initial form values
          makes={vehicleStore.vehicleMakes} // Passing vehicle makes to form component
          models={vehicleStore.vehicleModels} // Passing vehicle models to form component
        />
      )}
    </div>
  );
};

export default EditVehiclePage;
