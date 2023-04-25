import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { options } from '@constants/apiOptions';
import { Spinner } from '@components/UI/Spinner';
import { createAlert } from '@src/redux/slices/notifierSlice';
import { useAppDispatch } from '@src/hooks/reduxHooks';
import styles from './ImageCards.module.scss';
import { ICardItemResults, IImageCard } from './ImageCards.interface';

export const ImageCards = () => {
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=3&categories=ladies_all`;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleError = (error: Error) => {
    dispatch(
      createAlert({
        message: error.message,
      })
    );
  };

  const { isLoading, data } = useQuery({
    queryKey: 'cardsData',
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => handleError(error as Error),
  });

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
          <button className={styles.shopButton}>{t('Shop now')}</button>
          <div className={styles.imageWrap}>
            <img className={styles.imageCard} src={element.image} />
          </div>
        </div>
      ))}
    </div>
  );
};
