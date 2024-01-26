// src/services/VehicleMakeService.js

import BaseService from './BaseService';

class VehicleMakeService extends BaseService {
  constructor() {
    super('vehicleMakes');
  }
}

const vehicleMakeService = new VehicleMakeService();

export { vehicleMakeService };
