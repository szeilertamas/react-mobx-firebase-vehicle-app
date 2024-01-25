// src/components/VehicleList.js

import React from "react";

function VehicleList() {
  const dummyVehicles = [
    { id: 1, make: "Toyota", model: "Camry", year: 2022, price: 25000 },
    { id: 2, make: "Honda", model: "Accord", year: 2021, price: 28000 },
    { id: 3, make: "Ford", model: "Fusion", year: 2020, price: 26000 },
    { id: 4, make: "Chevrolet", model: "Malibu", year: 2024, price: 27000 },
    { id: 5, make: "Nissan", model: "Altima", year: 2023, price: 25500 },
    { id: 6, make: "Hyundai", model: "Sonata", year: 2020, price: 26500 },
    { id: 7, make: "Kia", model: "Optima", year: 2022, price: 25300 },
    { id: 8, make: "Volkswagen", model: "Passat", year: 2024, price: 27500 },
    { id: 9, make: "Subaru", model: "Legacy", year: 2023, price: 24500 },
  ];

  return (
    <div className="container mt-5" style={{ maxWidth: "80%" }}>
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
          {dummyVehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>€ {vehicle.price}</td>
              <td>
                <button className="btn btn-outline-primary me-2">Edit</button>
                <button className="btn btn-outline-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleList;
