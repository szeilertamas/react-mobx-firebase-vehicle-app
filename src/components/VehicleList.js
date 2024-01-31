// src/components/VehicleList.js

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';
import { useNavigate } from 'react-router-dom';
import Paging from './Paging';

const VehicleList = observer(({ sortingOption, filterValue }) => {
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

  const sortedModels = () => {
    let sortedArray = [...vehicleStore.vehicleModels];

    switch (sortingOption) {
      case 'lowestPrice':
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case 'highestPrice':
        sortedArray.sort((a, b) => b.price - a.price);
        break;
      case 'modelsAZ':
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'modelsZA':
        sortedArray.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'makeAZ':
        sortedArray.sort((a, b) => {
          const makeA = vehicleStore.vehicleMakes.find((make) => make.id === a.makeId)?.name || '';
          const makeB = vehicleStore.vehicleMakes.find((make) => make.id === b.makeId)?.name || '';
          return makeA.localeCompare(makeB);
        });
        break;
      case 'makeZA':
        sortedArray.sort((a, b) => {
          const makeA = vehicleStore.vehicleMakes.find((make) => make.id === a.makeId)?.name || '';
          const makeB = vehicleStore.vehicleMakes.find((make) => make.id === b.makeId)?.name || '';
          return makeB.localeCompare(makeA);
        });
        break;
      case 'newest':
        sortedArray.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        sortedArray.sort((a, b) => a.year - b.year);
        break;
      default:
    }

    return sortedArray;
  };

  const filteredModels = () => {
    return sortedModels().filter((model) => {
      const make = vehicleStore.vehicleMakes.find((make) => make.id === model.makeId)?.name || '';
      const modelName = model.name.toLowerCase();
      const modelYear = model.year.toString();
      const makeName = make.toLowerCase();
      const filterText = filterValue.toLowerCase();
  
      return modelName.includes(filterText) || makeName.includes(filterText) || modelYear.includes(filterText);
    });
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
          {vehicleStore.paginate(filteredModels()).map((model, index) => {
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
          totalPages={vehicleStore.calculateTotalPages(filteredModels())}
          goToNextPage={() => handlePageChange(vehicleStore.currentPage + 1)}
          goToPrevPage={() => handlePageChange(vehicleStore.currentPage - 1)}
          goToPage={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  );
});

export default VehicleList;
