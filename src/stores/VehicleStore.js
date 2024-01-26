// src/stores/VehicleStore.js

import { makeObservable, observable, action } from 'mobx';
import { vehicleMakeService } from '../services/VehicleMakeService';
import { vehicleModelService } from '../services/VehicleModelService';
import { useRootStore } from './RootStore';

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
      await vehicleMakeService.add(vehicle);
      await this.loadVehicleMakes();
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  }

  async updateVehicle(id, updatedVehicle) {
    try {
      await vehicleMakeService.update(id, updatedVehicle);
      await this.loadVehicleMakes();
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  }

  async deleteVehicle(id) {
    try {
      await vehicleMakeService.delete(id);
      await this.loadVehicleMakes();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
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
    });
  }
}

export default VehicleStore;
