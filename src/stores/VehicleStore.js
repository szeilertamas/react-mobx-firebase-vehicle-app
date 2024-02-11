// src/stores/VehicleStore.js

import { makeObservable, observable, action, reaction, runInAction } from 'mobx';
import { vehicleMakeService } from '../services/VehicleMakeService';
import { vehicleModelService } from '../services/VehicleModelService';

class VehicleStore {
  vehicleMakes = [];
  vehicleModels = [];
  currentPage = 1;
  itemsPerPage = 9;
  totalItems = 0;

  async loadVehicleMakes(filters = {}, sortBy = null, sortOrder = 'asc') {
    try {
      const vehicleMakes = await vehicleMakeService.getAllPaged(0, Infinity, filters, sortBy, sortOrder); // Fetch all vehicle makes
      
      runInAction(() => {
        this.vehicleMakes = vehicleMakes.data; // Update vehicleMakes array
      });
    } catch (error) {
      console.error('Error loading vehicle makes:', error);
    }
  }
  
  async loadVehicleModels(filters = {}, sortBy = null, sortOrder = 'asc', page = 1) {
    try {
      const startIdx = (page - 1) * this.itemsPerPage;
      const endIdx = startIdx + this.itemsPerPage;
      const { data, total } = await vehicleModelService.getAllPaged(0, Infinity, filters, sortBy, sortOrder);
      
      runInAction(() => {
        this.vehicleModels = data; // Update vehicleModels array
        this.currentPage = page; // Update currentPage
        this.totalItems = total; // Update totalItems count
      });
    } catch (error) {
      console.error('Error loading vehicle models:', error);
    }
  }   

  // Method to add a new vehicle to the database
  async addVehicle(vehicle) {
    try {
      const make = await vehicleMakeService.add({ name: vehicle.make });
      // Creating a new vehicle model object
      const vehicleModel = {
        makeId: make.id,
        name: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
      };
      // Adding the vehicle model to the vehicle models collection
      await vehicleModelService.add(vehicleModel);

      // Listening for updates to vehicle models collection and updating the observable array
      vehicleModelService.onCollectionUpdate((data) => {
        runInAction(() => {
          this.vehicleModels = data; // Updating vehicleModels array
        });
      });
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  }

  // Method to update a vehicle in the database
  async updateVehicle(id, updatedVehicle) {
    try {
      // Getting the existing vehicle from the database
      const existingVehicle = await vehicleModelService.getById(id);
      if (!existingVehicle) {
        console.error(`Vehicle with ID ${id} not found.`);
        return;
      }

      // Updating the vehicle details in the database
      await vehicleModelService.update(id, {
        name: updatedVehicle.model,
        price: updatedVehicle.price,
        year: updatedVehicle.year,
      });

      // Checking if the make of the vehicle has been updated
      if (updatedVehicle.makeId) {
        // Getting the make document from the database
        const make = await vehicleMakeService.getById(updatedVehicle.makeId);
        if (make) {
          // Updating the make details in the database
          await vehicleMakeService.update(updatedVehicle.makeId, {
            name: updatedVehicle.make,
          });
        } else {
          console.error(`Make with ID ${updatedVehicle.makeId} not found.`);
        }
      }
      await this.updateMake(existingVehicle.makeId, updatedVehicle.make);
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  }

    // Method to update the name of a make in the database
  async updateMake(makeId, newName) {
    try {
      await vehicleMakeService.update(makeId, { name: newName });
    } catch (error) {
      console.error('Error updating make:', error);
    }
  }

  // Method to delete a vehicle from the database
  async deleteVehicle(id) {
    try {
      // Finding the vehicle to delete from the observable array
      const vehicleToDelete = this.vehicleModels.find((vehicle) => vehicle.id === id);
      if (vehicleToDelete) {
        // Deleting the vehicle from the database
        await vehicleModelService.delete(id);
        // Deleting the make of the vehicle from the database
        await vehicleMakeService.delete(vehicleToDelete.makeId);
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  }

  // Method to fetch a make by its ID from the database
  async getMakeById(id) {
    try {
      const make = await vehicleMakeService.getById(id);
      return make;
    } catch (error) {
      console.error('Error fetching make by ID:', error);
      return null;
    }
  }

  // Method to get a vehicle by its ID from the observable array
  getVehicleById(id) {
    let foundVehicle = this.vehicleModels.find((vehicle) => vehicle.id === id);

    if (!foundVehicle) {
      // Reacting to changes in the observable array and updating foundVehicle
      const disposer = reaction(
        () => this.vehicleModels.find((vehicle) => vehicle.id === id),
        (updatedVehicle) => {
          if (updatedVehicle) {
            foundVehicle = updatedVehicle;
            disposer(); // Disposing the reaction to avoid memory leaks
          }
        }
      );
    }

    return foundVehicle; // Returning the found vehicle
  }

  // Method to set the current page for paging
  setCurrentPage(page) {
    this.currentPage = page;
  }

  // Method to calculate the total number of pages for paging
  calculateTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Method to paginate the items based on the current page
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
      totalItems: observable,
      loadVehicleMakes: action,
      loadVehicleModels: action,
      addVehicle: action,
      updateVehicle: action,
      deleteVehicle: action,
      getMakeById: action,
      getVehicleById: action,
      setCurrentPage: action,
      calculateTotalPages: action,
      paginate: action,
    });
  }
}

export default VehicleStore;
