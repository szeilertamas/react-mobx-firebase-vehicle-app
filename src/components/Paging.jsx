// src/components/Paging.jsx

import React from 'react';
import { observer } from 'mobx-react-lite';

const Paging = observer(({ currentPage, totalPages, goToNextPage, goToPrevPage, goToPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToPrevPage} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
            <button className="page-link" onClick={() => goToPage(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToNextPage} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
});

export default Paging;
