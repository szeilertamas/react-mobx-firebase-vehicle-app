// src/components/VehicleList.js

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';
import { useNavigate } from 'react-router-dom';
import Paging from './Paging';

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

  const handlePageChange = async (page) => {
    console.log('Changing page to', page);
    await vehicleStore.setCurrentPage(page);
    console.log('Current page after change', vehicleStore.currentPage);
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
          {vehicleStore.paginate(vehicleStore.vehicleModels).map((model, index) => {
            const make = vehicleStore.vehicleMakes.find((make) => make.id === model.makeId);
            const uniqueIndex = (vehicleStore.currentPage - 1) * vehicleStore.itemsPerPage + index + 1;
            return (
              <tr key={model.id}>
                <td>{uniqueIndex}</td>
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
      <div className="m-4">
        <Paging
          currentPage={vehicleStore.currentPage}
          totalPages={vehicleStore.calculateTotalPages()}
          goToNextPage={() => handlePageChange(vehicleStore.currentPage + 1)}
          goToPrevPage={() => handlePageChange(vehicleStore.currentPage - 1)}
          goToPage={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  );
});

export default VehicleList;
