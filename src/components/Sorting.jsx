// src/components/Sorting.jsx

import React from 'react';

function Sorting({ onSortChange }) {
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    onSortChange(newSort);
  };

  return (
    <div className="mt-3 ms-5">
      <select className="form-select" onChange={handleSortChange}>
        <option value="default">Sort by...</option>
        <option value="price">Price</option>
        <option value="year">Year</option>
        <option value="make">Make</option>
        <option value="model">Model</option>
      </select>
    </div>
  );
}

export default Sorting;
