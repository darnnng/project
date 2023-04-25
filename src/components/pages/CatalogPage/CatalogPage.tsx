import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { options } from '@constants/apiOptions';
import Pagination from '@components/pagination/Pagination';
import { Spinner } from '@components/UI/Spinner';
import { CategoryMenu } from '../HomePage/CategoryMenu';
import styles from './CatalogPage.module.scss';
import { ICatalogItemResults, IListItem } from './CatalogPage.interface';
import { CatalogItem } from './CatalogItem/CatalogItem';

const CatalogPage = () => {
  const { category } = useParams();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=28&categories=${category}`;
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();

  //TO-DO TRANSLATE FROM API
  //TO-DO ADD NOTIFIER

  const { isLoading, error, data } = useQuery('catalogData', () =>
    fetch(url, options).then((res) => res.json())
  );

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
  const lastPage = data?.pagination?.numberOfPages;

  //   const handleLikeClick = (itemId: string) => {
  //     const itemIndex = itemsList.findIndex((item: ICatalogItemResults) => item.id === itemId);
  //     if (itemIndex >= 0) {
  //       const updatedItemsList = [...itemsList];
  //       updatedItemsList[itemIndex].isFavourite = !updatedItemsList[itemIndex].isFavourite;
  //       setItems(updatedItemsList);
  //     }
  //   };

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
            <p className={styles.totalNumber}>Total number of items: {totalNumberofItems}</p>
          </div>
          <div className={styles.itemsContainer}>
            {itemsList?.map((item: IListItem) => (
              <CatalogItem key={item.id} item={item} />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </>
  );
};

export default CatalogPage;
