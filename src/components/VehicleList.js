// src/components/VehicleList.js

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';
import { useNavigate } from 'react-router-dom';
import Paging from './Paging';

const VehicleList = observer(({ sortingOption, filterValue, setIsLoading }) => {
  const { vehicleStore } = useRootStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vehicle data when component mounts
    const fetchData = async () => {
      try {
        // Load vehicle makes and models
        await vehicleStore.loadVehicleMakes();
        await vehicleStore.loadVehicleModels();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading state to false when data fetching completes
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vehicleStore, setIsLoading]);

  // Function to handle navigation to edit page
  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  // Function to handle page change
  const handlePageChange = async (page) => {
    console.log('Changing page to', page);
    await vehicleStore.setCurrentPage(page);
    console.log('Current page after change', vehicleStore.currentPage);
  };

  // Function to sort models based on selected sorting option
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

  // Function to filter models based on search input
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

  // Render vehicle list component
  return (
    <div className="container mt-5 table-container">
      <table className="table table-hover table-layout-fixed table-responsive">
        <thead className="thead-light">
          <tr>
            <th style={{ width: '5%' }}>#</th>
            <th style={{ width: '15%' }}>Make</th>
            <th style={{ width: '15%' }}>Model</th>
            <th style={{ width: '10%' }}>Year</th>
            <th style={{ width: '15%' }}>Price</th>
            <th style={{ width: '20%' }}>Actions</th>
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
                  {/* Edit button */}
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => handleEditClick(model.id)}
                  >
                    Edit
                  </button>
                  {/* Delete button */}
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
      {/* Display paging component if there are vehicle models */}
      {vehicleStore.vehicleModels.length > 0 && (
        <div className="m-4">
          <Paging
            currentPage={vehicleStore.currentPage}
            totalPages={vehicleStore.calculateTotalPages(filteredModels())}
            goToNextPage={() => handlePageChange(vehicleStore.currentPage + 1)}
            goToPrevPage={() => handlePageChange(vehicleStore.currentPage - 1)}
            goToPage={(page) => handlePageChange(page)}
          />
        </div>
      )}
    </div>
  );
});

export default VehicleList;
