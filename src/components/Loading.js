// src/components/Loading.js

import React from 'react';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" role="status">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
