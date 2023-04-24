import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { options } from '@constants/apiOptions';
import { CategoryMenu } from '../HomePage/CategoryMenu';
import styles from './CatalogPage.module.scss';
import { ICatalogItem, ICatalogItemResults } from './CatalogPage.interface';

const CatalogPage = () => {
  const { category } = useParams();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=${category}`;
  const [items, setItems] = useState<ICatalogItem>({
    results: [],
    pagination: { totalNumberOfResults: 0 },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    ? items?.results?.map((elem: ICatalogItemResults) => {
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
  const totalNumberofItems = items?.pagination?.totalNumberOfResults;

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
      <CategoryMenu />
      <div className={styles.filters}>
        <div className={styles.selectFilter}>
          <p className={styles.sortTitle}>Sort by:</p>
          <select defaultValue="stock" className={styles.styledSelect}>
            <option value="stock">Recommended</option>
            <option value="descPrice">Lowest price</option>
            <option value="ascPrice">Highest price</option>
          </select>
        </div>
        <p className={styles.totalNumber}>Total number of items: {totalNumberofItems}</p>
      </div>
      <div className={styles.itemsContainer}>
        {itemsList?.map((item) => (
          <div key={item.id} className={styles.card}>
            <img className={styles.imageCard} src={item.image} />
            <div className={styles.cardsText}>
              <div className={styles.nameDiv}>
                <div className={styles.imageName}>{item.name}</div>
                <div>
                  {item.isFavourite ? (
                    <span className={styles.itemLikeIcon}>favorite</span>
                  ) : (
                    <span className={styles.itemLikeIcon}>favorite</span>
                  )}
                </div>
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
