// src/components/Paging.js

import React from 'react';
import { observer } from 'mobx-react-lite';

const Paging = observer(({ currentPage, totalPages, goToNextPage, goToPrevPage, goToPage }) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Previous page button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => goToPrevPage()} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {/* Pagination items */}
        {[...Array(totalPages)].map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => goToPage(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
        {/* Next page button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => goToNextPage(currentPage + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
});

export default Paging;
