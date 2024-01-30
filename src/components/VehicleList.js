import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';
import { useNavigate } from 'react-router-dom';

const VehicleList = observer(() => {
  const { vehicleStore } = useRootStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await vehicleStore.loadVehicleMakes();
        await vehicleStore.loadVehicleModels();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
          {vehicleStore.vehicleModels.map((model, index) => {
            const make = vehicleStore.vehicleMakes.find((make) => make.id === model.makeId);
            return (
              <tr key={model.id}>
                <td>{index + 1}</td>
                <td>{make ? make.name : ''}</td>
                <td>{model.name}</td>
                <td>{model.year}</td>
                <td>€ {model.price}</td>
                <td>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => handleEditClick(model.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => vehicleStore.deleteVehicle(model.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default VehicleList;
