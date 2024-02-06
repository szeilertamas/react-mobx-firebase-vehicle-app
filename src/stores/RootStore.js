// src/stores/RootStore.js

import React, { createContext, useContext } from 'react';
import { makeObservable, observable } from 'mobx';
import VehicleStore from './VehicleStore';

// Creating a context for the root store
const RootStoreContext = createContext();

class RootStore {
  vehicleStore;

  constructor() {
    this.vehicleStore = new VehicleStore();
    // Making vehicleStore observable using makeObservable from mobx
    makeObservable(this, {
      vehicleStore: observable,
    });
  }
}

const rootStore = new RootStore();

// RootStoreProvider component to provide the root store context to its children
const RootStoreProvider = ({ children }) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

// Custom hook to access the root store
const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return context;
};

export { RootStoreProvider, useRootStore };
