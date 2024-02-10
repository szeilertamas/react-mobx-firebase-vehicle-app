// src/components/Filtering.jsx

import React, { useState } from 'react';

function Filtering({ onFilterChange }) {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  const handleResetFilter = () => {
    setFilterValue('');
    onFilterChange('');
    console.log('Filter reset');
  };

  return (
    <div className="mt-3 mx-5 d-flex" style={{ width: '500px' }}>
      <input
        type="text"
        className="form-control custom-width me-2"
        placeholder="Filter by Make, Model or Year..."
        value={filterValue}
        onChange={handleFilterChange}
      />
      <button
        className="btn btn-secondary ms-1"
        onClick={handleResetFilter}
        disabled={!filterValue}
      >
        Reset
      </button>
    </div>
  );
}

export default Filtering;
