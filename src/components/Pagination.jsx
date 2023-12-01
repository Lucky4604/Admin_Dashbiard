import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate , style}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={style}>
    <span>Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}</span>
    {pageNumbers.map(number => (
      <button key={number} onClick={() => paginate(number)}>
        {number}
      </button>
    ))}
  </div>

  );
};

export default Pagination;
