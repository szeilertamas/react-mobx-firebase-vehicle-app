// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RootStoreProvider } from './stores/RootStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </React.StrictMode>
);
