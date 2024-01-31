// src/components/Sorting.js

import React, { useState } from 'react';

function Sorting({ onSortChange }) {
  const [hasSelectedOption, setHasSelectedOption] = useState(false);

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    if (newSort === 'default') {
      setHasSelectedOption(false);
    } else {
      setHasSelectedOption(true);
    }
    onSortChange(newSort);
  };

  return (
    <div className="mt-3 ms-5">
      <select className="form-select" onChange={handleSortChange}>
        <option value="default">
          {hasSelectedOption ? 'Default' : 'Sort by...'}
        </option>
        <option value="lowestPrice">Lowest Price</option>
        <option value="highestPrice">Highest Price</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="makeAZ">[A-Z] Make</option>
        <option value="makeZA">[Z-A] Make</option>
        <option value="modelsAZ">[A-Z] Models</option>
        <option value="modelsZA">[Z-A] Models</option>
      </select>
    </div>
  );
}

export default Sorting;
