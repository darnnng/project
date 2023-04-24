/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { options } from '@constants/apiOptions';
import styles from './ImageCards.module.scss';

export const ImageCards = () => {
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=3&categories=ladies_all`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  console.log(items);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemsList = items?.results?.map((elem: any) => {
    return { id: elem.code, name: elem.name, image: elem.galleryImages[0].baseUrl };
  });
  return (
    <div className={styles.cardsContainer}>
      {itemsList?.map((category: any) => (
        <div key={category.id} className={styles.card}>
          <div className={styles.imageName}>{category.name}</div>
          <button className={styles.shopButton}>Shop now</button>
          <div className={styles.imageWrap}>
            <img className={styles.imageCard} src={category.image} />
          </div>
        </div>
      ))}
    </div>
  );
};
