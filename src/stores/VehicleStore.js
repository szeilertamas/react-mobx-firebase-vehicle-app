// src/stores/VehicleStore.js

import { makeObservable, observable, action } from 'mobx';
import { vehicleMakeService } from '../services/VehicleMakeService';
import { vehicleModelService } from '../services/VehicleModelService';

class VehicleStore {
  vehicleMakes = [];
  vehicleModels = [];

  async loadVehicleMakes() {
    try {
      this.vehicleMakes = await vehicleMakeService.getAll();
    } catch (error) {
      console.error('Error loading vehicle makes:', error);
    }
  }

  async loadVehicleModels() {
    try {
      this.vehicleModels = await vehicleModelService.getAll();
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

      await this.loadVehicleMakes();
      await this.loadVehicleModels();
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
  
      await this.loadVehicleMakes();
      await this.loadVehicleModels();
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
        await this.loadVehicleMakes();
        await this.loadVehicleModels();
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  }

  getVehicleById(id) {
    return this.vehicleModels.find((vehicle) => vehicle.id === id);
  }

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      vehicleModels: observable,
      loadVehicleMakes: action,
      loadVehicleModels: action,
      addVehicle: action,
      updateVehicle: action,
      deleteVehicle: action,
      getVehicleById: action,
    });
  }
}

export default VehicleStore;
