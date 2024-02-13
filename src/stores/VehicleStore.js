// src/stores/VehicleStore.js

import {
  makeObservable,
  observable,
  action,
  reaction,
  runInAction,
} from "mobx";
import { vehicleMakeService } from "../services/VehicleMakeService";
import { vehicleModelService } from "../services/VehicleModelService";
import { getDocs } from "firebase/firestore";

class VehicleStore {
  vehicleMakes = [];
  vehicleModels = [];
  currentPage = 1;
  itemsPerPage = 9;
  totalItems = 0;
  filters = {};
  sortBy = null;
  sortOrder = "asc";

  async loadVehicleMakes() {
    try {
      const queryRef = vehicleMakeService.collection;
      const filteredQueryRef = await vehicleMakeService.filterData(queryRef, this.filters);
      const sortedQueryRef = await vehicleMakeService.sortData(filteredQueryRef, this.sortBy, this.sortOrder);
      const data = await vehicleMakeService.getAll(sortedQueryRef);
      runInAction(() => {
        this.vehicleMakes = data;
      });
    } catch (error) {
      console.error("Error loading vehicle makes:", error);
    }
  }
  
  async loadVehicleModels({ search, sortBy, sortOrder }) {
    try {
      let queryRef = vehicleModelService.collection;
      queryRef = await vehicleModelService.filterData(queryRef, this.filters);
      queryRef = await vehicleModelService.sortData(queryRef, sortBy, sortOrder); // Update this line
      const data = await vehicleModelService.getAll(queryRef);
      const totalItemsRef = vehicleModelService.collection; // Get reference to all documents
      const totalItemsSnapshot = await getDocs(totalItemsRef); // Fetch all documents
      const totalItems = totalItemsSnapshot.size; // Get total number of documents
      runInAction(() => {
        this.vehicleModels = data;
        this.totalItems = totalItems; // Set totalItems to total number of documents
      });
    } catch (error) {
      console.error("Error loading vehicle models:", error);
    }
  }

  async loadPaginatedVehicleModels() {
    try {
      const data = await vehicleModelService.getPaginated(this.currentPage, this.itemsPerPage);
      const totalItems = await vehicleModelService.getTotalCount();
      runInAction(() => {
        this.vehicleModels = data;
        this.totalItems = totalItems;
      });
    } catch (error) {
      console.error("Error loading paginated vehicle models:", error);
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
      // No need to update vehicleModels since onCollectionUpdate is handling it
    } catch (error) {
      console.error("Error adding vehicle:", error);
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
      await this.updateMake(existingVehicle.makeId, updatedVehicle.make);
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  }

  async updateMake(makeId, newName) {
    try {
      await vehicleMakeService.update(makeId, { name: newName });
    } catch (error) {
      console.error("Error updating make:", error);
    }
  }

  async deleteVehicle(id) {
    try {
      const vehicleToDelete = this.vehicleModels.find(
        (vehicle) => vehicle.id === id
      );
      if (vehicleToDelete) {
        await vehicleModelService.delete(id);
        await vehicleMakeService.delete(vehicleToDelete.makeId);
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  }

  async getMakeById(id) {
    try {
      const make = await vehicleMakeService.getById(id);
      return make;
    } catch (error) {
      console.error("Error fetching make by ID:", error);
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
    this.loadPaginatedVehicleModels();
  }

  calculateTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
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
      totalItems: observable,
      filters: observable,
      sortBy: observable,
      sortOrder: observable,
      loadVehicleMakes: action,
      loadVehicleModels: action,
      addVehicle: action,
      updateVehicle: action,
      deleteVehicle: action,
      getMakeById: action,
      getVehicleById: action,
      loadPaginatedVehicleModels: action,
      setCurrentPage: action,
      calculateTotalPages: action,
      paginate: action,
    });
  }
}

export default VehicleStore;
