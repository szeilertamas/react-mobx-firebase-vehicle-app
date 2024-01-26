// src/stores/RootStore.js

import React, { createContext, useContext } from 'react';
import { makeObservable, observable, action } from 'mobx';
import VehicleStore from './VehicleStore';

const RootStoreContext = createContext();

class RootStore {
  vehicleStore;

  constructor() {
    this.vehicleStore = new VehicleStore();
    makeObservable(this, {
      vehicleStore: observable,
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
