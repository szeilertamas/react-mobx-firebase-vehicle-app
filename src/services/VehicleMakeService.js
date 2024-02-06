// src/services/VehicleMakeService.js

import BaseService from './BaseService';

class VehicleMakeService extends BaseService {
  constructor() {
    super('vehicleMakes'); // Calling super constructor with the collection name 'vehicleMakes'
  }
}

const vehicleMakeService = new VehicleMakeService();

export { vehicleMakeService }; // Exporting the instance of VehicleMakeService
