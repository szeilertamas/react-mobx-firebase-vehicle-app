// src/stores/RootStore.js

import React, { createContext, useContext } from 'react';
import { makeObservable, observable } from 'mobx';
import VehicleStore from './VehicleStore';
import FormStore from './FormStore'; // Import FormStore

const RootStoreContext = createContext();

class RootStore {
  vehicleStore;
  formStore; // Add formStore property

  constructor() {
    this.vehicleStore = new VehicleStore();
    this.formStore = new FormStore(); // Initialize FormStore
    makeObservable(this, {
      vehicleStore: observable,
      formStore: observable, // Make formStore observable
    });
  }
}

const rootStore = new RootStore();

const RootStoreProvider = ({ children }) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return context;
};

export { RootStoreProvider, useRootStore };
