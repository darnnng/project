import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pagination } from '@src/features/Pagination';
import { Spinner } from '@src/shared/ui/Spinner';
import { useAppDispatch, useAppSelector } from '@src/shared/model/reduxHooks';
import { selectedPage, setPage } from '@src/features/Pagination/model/paginationSlice';
import { selectedFilter, setFilter } from '@src/features/Sorting/model/filterSlice';
import { CatalogList } from '@src/widgets/CatalogList';
import { useCatalogList } from '@src/widgets/CatalogList/model/useCatalogList';
import { Urls } from '@shared/constants/urls';
import { CategoryMenu } from '../../widgets/CategoryMenu';
import { SortingSelect } from '../../features/Sorting';
import styles from './CatalogPage.module.scss';

const CatalogPage = () => {
  const { category } = useParams();
  const prevCategoryRef = useRef<string | undefined>(category);
  const { page } = useAppSelector(selectedPage);
  const { filter } = useAppSelector(selectedFilter);
  const url = `${Urls.CATALOG}${page}&pagesize=28&categories=${category}&sortBy=${filter}`;
  const { isLoading, totalNumberOfItems, pageCount } = useCatalogList(url, page, filter);
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

  //TO-DO RETURN TO THE TOP OF THE PAGE WHEN CHANGING PAGE

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div data-testid="catalog-page" className={styles.catalogPageContainer}>
          <CategoryMenu />
          <div className={styles.filters}>
            <SortingSelect onFilterChange={onFilterChange} filter={filter} />
            <div className={styles.pagesDiv}>
              <p>
                {t('Page')} <b>{page + 1}</b>
              </p>
              <p className={styles.totalNumber}>
                {t('Total number of items:')} {totalNumberOfItems}
              </p>
            </div>
          </div>
          <CatalogList />
          {!!totalNumberOfItems && (
            <Pagination pageCount={pageCount} onPageChange={onPageChange} page={page} />
          )}
        </div>
      )}
    </>
  );
};

export default CatalogPage;
