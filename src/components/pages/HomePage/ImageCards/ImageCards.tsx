import React from 'react';
import { useQuery } from 'react-query';
import { options } from '@constants/apiOptions';
import styles from './ImageCards.module.scss';
import { ICardItemResults, IImageCard } from './ImageCards.interface';

export const ImageCards = () => {
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=3&categories=ladies_all`;

  //TO-DO TRANSLATE FROM API
  //TO-DO ADD NOTIFIER

  const { isLoading, error, data } = useQuery('cardsData', () =>
    fetch(url, options).then((res) => res.json())
  );

  const itemsList = data?.results?.map((elem: ICardItemResults) => {
    return { id: elem.code, name: elem.name, image: elem.galleryImages[0].baseUrl };
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.cardsContainer}>
      {itemsList?.map((element: IImageCard) => (
        <div key={element.id} className={styles.card}>
          <div className={styles.imageName}>{element.name}</div>
          <button className={styles.shopButton}>Shop now</button>
          <div className={styles.imageWrap}>
            <img className={styles.imageCard} src={element.image} />
          </div>
        </div>
      ))}
    </div>
  );
};
