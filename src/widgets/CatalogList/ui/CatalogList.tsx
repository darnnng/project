import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@shared/model/reduxHooks';
import { selectedFilter } from '@features/Sorting/model/filterSlice';
import { selectedPage } from '@features/Pagination/model/paginationSlice';
import { CatalogItem } from '@entities/catalogItem';
import { useCatalogList } from '../model/useCatalogList';
import { IListItem } from '../model/CatalogList.interface';
import styles from './CatalogList.module.scss';

export const CatalogList = () => {
  const { category } = useParams();
  const { page } = useAppSelector(selectedPage);
  const { filter } = useAppSelector(selectedFilter);
  const { t } = useTranslation();
  const { itemsList } = useCatalogList(
    `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=${page}&pagesize=28&categories=${category}&sortBy=${filter}`,
    page,
    filter
  );
  return (
    <>
      {itemsList.length ? (
        <div className={styles.itemsContainer}>
          {itemsList?.map((item: IListItem) => (
            <CatalogItem key={item.id} item={item} category={category!} />
          ))}
        </div>
      ) : (
        <p className={styles.textNoItems}> {t('Looks like there no items yet...')}</p>
      )}
    </>
  );
};
