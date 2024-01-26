// src/components/VehicleList.js

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';
import { useNavigate } from 'react-router-dom';

const VehicleList = observer(() => {
  const { vehicleStore } = useRootStore();
  const navigate = useNavigate();
  const [combinedVehicles, setCombinedVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await vehicleStore.loadVehicleMakes();
      await vehicleStore.loadVehicleModels();

      const combinedData = vehicleStore.vehicleModels.map((model) => {
        const make = vehicleStore.vehicleMakes.find((make) => make.id === model.makeId);
        return {
          id: model.id,
          make: make ? make.name : '',
          model: model.name,
          year: model.year,
          price: model.price,
        };
      });

      setCombinedVehicles(combinedData);
    };

    fetchData();
  }, [vehicleStore]);

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container mt-5 table-container">
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {combinedVehicles.map((vehicle, index) => (
            <tr key={vehicle.id}>
              <td>{index + 1}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>€ {vehicle.price}</td>
              <td>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => handleEditClick(vehicle.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => vehicleStore.deleteVehicle(vehicle.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default VehicleList;
