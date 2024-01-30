// src/stores/VehicleStore.js

import { makeObservable, observable, action, reaction, runInAction } from 'mobx';
import { vehicleMakeService } from '../services/VehicleMakeService';
import { vehicleModelService } from '../services/VehicleModelService';

class VehicleStore {
  vehicleMakes = [];
  vehicleModels = [];
  currentPage = 1;
  itemsPerPage = 9;

  async loadVehicleMakes() {
    try {
      vehicleMakeService.onCollectionUpdate((data) => {
        runInAction(() => {
          this.vehicleMakes = data;
        });
      });
    } catch (error) {
      console.error('Error loading vehicle makes:', error);
    }
  }

  async loadVehicleModels() {
    try {
      vehicleModelService.onCollectionUpdate((data) => {
        runInAction(() => {
          this.vehicleModels = data;
        });
      });
    } catch (error) {
      console.error('Error loading vehicle models:', error);
    }
  }

  async addVehicle(vehicle) {
    try {
      const make = await vehicleMakeService.add({ name: vehicle.make });
      const vehicleModel = {
        makeId: make.id,
        name: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
      };
      await vehicleModelService.add(vehicleModel);

      vehicleModelService.onCollectionUpdate((data) => {
        runInAction(() => {
          this.vehicleModels = data;
        });
      });
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  }

  async updateVehicle(id, updatedVehicle) {
    try {
      const existingVehicle = await vehicleModelService.getById(id);
      if (!existingVehicle) {
        console.error(`Vehicle with ID ${id} not found.`);
        return;
      }

      await vehicleModelService.update(id, {
        name: updatedVehicle.model,
        price: updatedVehicle.price,
        year: updatedVehicle.year,
      });

      if (updatedVehicle.makeId) {
        const make = await vehicleMakeService.getById(updatedVehicle.makeId);
        if (make) {
          await vehicleMakeService.update(updatedVehicle.makeId, {
            name: updatedVehicle.make,
          });
        } else {
          console.error(`Make with ID ${updatedVehicle.makeId} not found.`);
        }
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  }

  async deleteVehicle(id) {
    try {
      const vehicleToDelete = this.vehicleModels.find((vehicle) => vehicle.id === id);
      if (vehicleToDelete) {
        await vehicleModelService.delete(id);
        await vehicleMakeService.delete(vehicleToDelete.makeId);
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  }

  async getMakeById(id) {
    try {
      const make = await vehicleMakeService.getById(id);
      return make;
    } catch (error) {
      console.error('Error fetching make by ID:', error);
      return null;
    }
  }

  getVehicleById(id) {
    let foundVehicle = this.vehicleModels.find((vehicle) => vehicle.id === id);

    if (!foundVehicle) {
      const disposer = reaction(
        () => this.vehicleModels.find((vehicle) => vehicle.id === id),
        (updatedVehicle) => {
          if (updatedVehicle) {
            foundVehicle = updatedVehicle;
            disposer();
          }
        }
      );
    }

    return foundVehicle;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  calculateTotalPages() {
    return Math.ceil(this.vehicleModels.length / this.itemsPerPage);
  }

  paginate(items) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return items.slice(startIndex, endIndex);
  }

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      vehicleModels: observable,
      currentPage: observable,
      itemsPerPage: observable,
      loadVehicleMakes: action,
      loadVehicleModels: action,
      addVehicle: action,
      updateVehicle: action,
      deleteVehicle: action,
      getVehicleById: action,
      setCurrentPage: action,
      calculateTotalPages: action,
      paginate: action,
    });
  }
}

export default VehicleStore;
