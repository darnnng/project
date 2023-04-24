/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { options } from '@constants/apiOptions';
import { CategoryMenu } from '../HomePage/CategoryMenu';
import styles from './CatalogPage.module.scss';

const CatalogPage = () => {
  const { category } = useParams();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=${category}`;
  const [items, setItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  //TO-DO TRANSLATE FROM API
  //TO-DO ADD NOTIFIER

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        setItems(result);
      })
      .catch((err) => console.log(err));
  }, [url]);

  const itemsList = items?.results
    ? items?.results?.map((elem: any) => {
        return {
          id: elem.defaultArticle.code,
          name: elem.defaultArticle.name,
          image: elem.allArticleBaseImages[0],
          attribute: elem.sellingAttributes ? elem.sellingAttributes[0] : ' ',
          price: elem.price.formattedValue,
        };
      })
    : [];
  const totalNumberofItems = items?.pagination?.totalNumberOfResults;

  console.log(items);

  return (
    <>
      <CategoryMenu />
      <div className={styles.filters}>
        <div className={styles.selectFilter}>
          <p className={styles.sortTitle}>Sort by:</p>
          <select className={styles.styledSelect}>
            <option selected value="stock">
              Recommended
            </option>
            <option value="descPrice">Lowest price</option>
            <option value="ascPrice">Highest price</option>
          </select>
        </div>
        <p className={styles.totalNumber}>Total number of items: {totalNumberofItems}</p>
      </div>
      <div className={styles.itemsContainer}>
        {itemsList?.map((item: any) => (
          <div key={item.id} className={styles.card}>
            <img className={styles.imageCard} src={item.image} />
            <div className={styles.cardsText}>
              <div className={styles.nameDiv}>
                <div className={styles.imageName}>{item.name}</div>
                <span className={styles.itemLikeIcon}>favorite</span>
              </div>
              <div className={styles.price}>{item.price}</div>
              <div className={styles.attribute}>{item.attribute}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CatalogPage;
