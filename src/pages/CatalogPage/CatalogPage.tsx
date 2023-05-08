import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pagination } from '@src/features/Pagination';
import { Spinner } from '@src/shared/ui/Spinner';
import { useAppDispatch, useAppSelector } from '@src/shared/model/reduxHooks';
import { selectedPage, setPage } from '@src/features/Pagination/model/paginationSlice';
import { selectedFilter, setFilter } from '@src/features/Sorting/model/filterSlice';
import { CatalogList } from '@src/widgets/CatalogList';
import { useCatalogList } from '@src/widgets/CatalogList/lib/useCatalogList';
import { CategoryMenu } from '../../widgets/CategoryMenu';
import { SortingSelect } from '../../features/Sorting';
import styles from './CatalogPage.module.scss';

const CatalogPage = () => {
  const { category } = useParams();
  const prevCategoryRef = useRef<string | undefined>(category);
  const { page } = useAppSelector(selectedPage);
  const { filter } = useAppSelector(selectedFilter);
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=${page}&pagesize=28&categories=${category}&sortBy=${filter}`;
  const { isLoading, totalNumberofItems, pageCount } = useCatalogList(url, page, filter);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (prevCategoryRef.current !== category) {
      dispatch(setPage(0));
      dispatch(setFilter('stock'));
    }
    prevCategoryRef.current = category;
  }, [category, dispatch]);

  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const onFilterChange = (filter: string) => {
    dispatch(setFilter(filter));
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.catalogPageContainer}>
          <CategoryMenu />
          <div className={styles.filters}>
            <SortingSelect onFilterChange={onFilterChange} filter={filter} />
            <p className={styles.totalNumber}>
              {t('Total number of items:')} {totalNumberofItems}
            </p>
          </div>
          <CatalogList />
          {!!totalNumberofItems && (
            <Pagination pageCount={pageCount} onPageChange={onPageChange} page={page} />
          )}
        </div>
      )}
    </>
  );
};

export default CatalogPage;
