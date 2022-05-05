import React from 'react';
import css from './Pagination.module.css';
import { PaginationType } from '../../Types';

const Pagination: React.FC<PaginationType> = ({
  countriesPerPage,
  totalCountries,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className={css.pagination}>
      {pageNumbers.map((num, i) => (
        <li
          className={`${css.item} ${i === currentPage - 1 ? css.active : ''}`}
          key={num}
          onClick={() => paginate(num)}
        >
          {num}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
