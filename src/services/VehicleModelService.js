// src/services/VehicleModelService.js

import BaseService from './BaseService';

class VehicleModelService extends BaseService {
  constructor() {
    super('vehicleModels'); // Calling super constructor with the collection name 'vehicleModels'
  }
}

const vehicleModelService = new VehicleModelService();

export { vehicleModelService }; // Exporting the instance of VehicleModelService
