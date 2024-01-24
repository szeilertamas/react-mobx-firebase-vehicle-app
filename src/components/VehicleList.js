// src/components/VehicleList.js

import React from 'react';

function VehicleList() {
  const dummyVehicles = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2022, price: 25000 },
    { id: 2, make: 'Honda', model: 'Accord', year: 2021, price: 28000 },
    { id: 3, make: 'Ford', model: 'Fusion', year: 2022, price: 26000 },
    { id: 4, make: 'Chevrolet', model: 'Malibu', year: 2021, price: 27000 },
    { id: 5, make: 'Nissan', model: 'Altima', year: 2022, price: 25500 },
    { id: 6, make: 'Hyundai', model: 'Sonata', year: 2021, price: 26500 },
    { id: 7, make: 'Kia', model: 'Optima', year: 2022, price: 25300 },
    { id: 8, make: 'Volkswagen', model: 'Passat', year: 2021, price: 27500 },
    { id: 9, make: 'Subaru', model: 'Legacy', year: 2022, price: 24500 },
    { id: 10, make: 'Mazda', model: 'Mazda6', year: 2021, price: 29000 },
  ];

  return (
    <div className="container mt-5" style={{ maxWidth: '80%' }}>
      <h3 className="mb-4">Vehicle List</h3>
      <table className="table table-striped">
        <thead className="table">
          <tr>
            <th>ID</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyVehicles.map((vehicle, index) => (
            <tr key={vehicle.id} className={index % 2 === 0 ? 'table-light' : ''}>
              <td>{vehicle.id}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>€{vehicle.price}</td>
              <td>
                <button className="btn btn-primary me-2">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleList;