// src/services/VehicleModelService.js

import BaseService from './BaseService';

class VehicleModelService extends BaseService {
  constructor() {
    super('vehicleModels');
  }
}

const vehicleModelService = new VehicleModelService();

export { vehicleModelService };
