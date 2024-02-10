// src/pages/EditVehiclePage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";
import Loading from "../components/Loading";
import { useRootStore } from "../stores/RootStore";
import Navbar from '../components/Navbar';

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicleStore, formStore } = useRootStore();

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null);

  // Fetch initial data
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

    // Reset form state when initialValues change
    useEffect(() => {
      formStore.clearFormData();
    }, [initialValues, formStore]);

  // Function to handle updating vehicle
  const handleUpdateVehicle = async (formData) => {
    await vehicleStore.loadVehicleMakes();

    const selectedMake = vehicleStore.vehicleMakes.find((make) => make.name === formData.make);

    if (selectedMake) {
      formData.makeId = selectedMake.id;
    }

    vehicleStore.updateVehicle(id, formData);

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
          onSubmit={handleUpdateVehicle}
          onCancel={handleCancel}
          initialValues={initialValues}
          makes={vehicleStore.vehicleMakes}
          models={vehicleStore.vehicleModels}
        />
      )}
      {/* Display error message if form has been submitted and there are errors */}
      {formStore.formSubmitted && Object.keys(formStore.errors).length > 0 && (
        <div className="alert alert-danger mt-3" role="alert">
          Please fix the errors before submitting the form.
        </div>
      )}
    </div>
  );
};

export default EditVehiclePage;
