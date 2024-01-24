// src/components/Sorting.js

import React from 'react';

function Sorting() {
  return (
    <div className="mt-3 ms-5">
      <select className="form-select">
        <option value="">Sort by...</option>
        <option value="make">Make</option>
        <option value="model">Model</option>
        <option value="year">Year</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
}

export default Sorting;
