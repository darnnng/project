import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 28;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = 150; //ДАННЫЕ В АПИШКЕ ЕСТЬ

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % 9000; //items.length тоже из апишки взять
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName="item active "
        breakClassName={'item break-me '}
        containerClassName={styles.pagination}
        disabledClassName={styles.disabledpage}
        marginPagesDisplayed={2}
        nextClassName={'item next '}
        pageClassName={'item pagination-page '}
        previousClassName={'item previous'}
      />
    </>
  );
};

export default Pagination;
