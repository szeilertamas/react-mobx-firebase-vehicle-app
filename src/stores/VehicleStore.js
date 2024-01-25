// src/stores/VehicleStore.js

import { makeObservable, observable, action } from 'mobx';

class VehicleStore {
  vehicles = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2022, price: 25000 },
    { id: 2, make: "Honda", model: "Accord", year: 2021, price: 28000 },
    { id: 3, make: "Ford", model: "Fusion", year: 2020, price: 26000 },
    { id: 4, make: "Chevrolet", model: "Malibu", year: 2024, price: 27000 },
    { id: 5, make: "Nissan", model: "Altima", year: 2023, price: 25500 },
    { id: 6, make: "Hyundai", model: "Sonata", year: 2020, price: 26500 },
    { id: 7, make: "Kia", model: "Optima", year: 2022, price: 25300 },
    { id: 8, make: "Volkswagen", model: "Passat", year: 2024, price: 27500 },
    { id: 9, make: "Subaru", model: "Legacy", year: 2023, price: 24500 },
  ];

  getVehicleById(id) {
    return this.vehicles.find((vehicle) => vehicle.id === parseInt(id));
  }

  addVehicle(vehicle) {
    const lastVehicle = this.vehicles[this.vehicles.length - 1];
    const newId = lastVehicle ? lastVehicle.id + 1 : 1;
    
    const newVehicle = {
      id: newId,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
    };

    this.vehicles.push(newVehicle);
  }

  updateVehicle(id, updatedVehicle) {
    const index = this.vehicles.findIndex((v) => v.id === id);
    if (index !== -1) {
      this.vehicles[index] = updatedVehicle;
    }
  }

  deleteVehicle(id) {
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
  }

  constructor() {
    makeObservable(this, {
      vehicles: observable,
      addVehicle: action,
      updateVehicle: action,
      deleteVehicle: action,
    });
  }
}

export default VehicleStore;
