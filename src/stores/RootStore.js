// src/stores/RootStore.js

import React, { createContext, useContext } from 'react';
import VehicleStore from './VehicleStore';

const RootStoreContext = createContext();

const RootStoreProvider = ({ children }) => {
  const rootStore = {
    vehicleStore: new VehicleStore(),
  };

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
