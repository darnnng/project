import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { options } from '@constants/apiOptions';
import { Pagination } from '@components/pages/CatalogPage/Pagination/Pagination';
import { Spinner } from '@components/UI/Spinner';
import { createAlert } from '@src/redux/slices/notifierSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks';
import { selectedPage, setPage } from '@src/redux/slices/paginationSlice';
import { CategoryMenu } from '../HomePage/CategoryMenu';
import styles from './CatalogPage.module.scss';
import { ICatalogItemResults, IListItem } from './CatalogPage.interface';
import { CatalogItem } from './CatalogItem/CatalogItem';

//TO-DO ADD ENV

const CatalogPage = () => {
  const { category } = useParams();
  const { page } = useAppSelector(selectedPage);
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=${page}&pagesize=28&categories=${category}`;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleError = (error: Error) => {
    dispatch(
      createAlert({
        message: error.message,
      })
    );
  };

  const { isLoading, data } = useQuery({
    queryKey: ['catalogData', [url, page]],
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => handleError(error as Error),
  });

  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const itemsList = data?.results
    ? data?.results?.map((elem: ICatalogItemResults) => {
        return {
          id: elem.defaultArticle.code,
          name: elem.defaultArticle.name,
          image: elem.allArticleBaseImages ? elem.allArticleBaseImages[0] : elem.images[0].baseUrl,
          attribute: elem.sellingAttributes ? elem.sellingAttributes[0] : ' ',
          price: elem.price.formattedValue,
          isFavourite: false,
        };
      })
    : [];
  const totalNumberofItems = data?.pagination?.totalNumberOfResults;
  const pageCount = data?.pagination?.numberOfPages;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CategoryMenu />
          <div className={styles.filters}>
            <div className={styles.selectFilter}>
              <p className={styles.sortTitle}>{t('Sort by:')}</p>
              <select defaultValue="stock" className={styles.styledSelect}>
                <option value="stock">{t('Recommended')}</option>
                <option value="descPrice">{t('Lowest price')}</option>
                <option value="ascPrice">{t('Highest price')}</option>
              </select>
            </div>
            <p className={styles.totalNumber}>
              {t('Total number of items:')} {totalNumberofItems}
            </p>
          </div>
          {itemsList.length ? (
            <div className={styles.itemsContainer}>
              {itemsList?.map((item: IListItem) => (
                <CatalogItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className={styles.textNoItems}> Looks like there no items yet...</p>
          )}

          <Pagination pageCount={pageCount} onPageChange={onPageChange} page={page} />
        </>
      )}
    </>
  );
};

export default CatalogPage;
