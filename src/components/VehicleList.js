// src/components/VehicleList.js

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';
import { useNavigate } from 'react-router-dom';

const VehicleList = observer(() => {
  const { vehicleStore } = useRootStore();
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container mt-5 table-container">
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th>Id</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicleStore.vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
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
