import React from 'react';
import ReactPaginate from 'react-paginate';
import { IPagination, ISelectedItem } from '../model/types';
import styles from './Pagination.module.scss';

export const Pagination = ({ pageCount, onPageChange, page }: IPagination) => {
  const handlePageClick = (event: ISelectedItem) => {
    onPageChange(event.selected);
  };

  return (
    <div className={styles.paginationContainer}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel=""
        activeClassName={styles.item}
        breakClassName={styles.break}
        forcePage={page}
        containerClassName={styles.pagination}
        disabledClassName={styles.disabledpage}
        marginPagesDisplayed={3}
        pageClassName={`${styles.item}  ${styles.paginationpage}`}
      />
    </div>
  );
};
