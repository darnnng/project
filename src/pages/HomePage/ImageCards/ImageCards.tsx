import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { options } from '@src/shared/api/apiOptions';
import { createAlert } from '@src/redux/slices/notifierSlice';
import { useAppDispatch } from '@src/shared/model/reduxHooks';
import { RoutePath } from '@src/shared/constants/routes';
import styles from './ImageCards.module.scss';
import { ICardItemResults, IImageCard } from './ImageCards.interface';

export const ImageCards = () => {
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=3&categories=ladies_all`;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleError = (error: Error) => {
    dispatch(
      createAlert({
        message: error.message,
      })
    );
  };

  const { data } = useQuery({
    queryKey: 'cardsData',
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => handleError(error as Error),
  });

  const itemsList = data?.results?.map((elem: ICardItemResults) => {
    return {
      id: elem.code,
      name: elem.name,
      image: elem.galleryImages[0].baseUrl,
      article: elem.defaultArticle.code,
    };
  });

  const moveToItemPage = (id: string) => {
    navigate(`/${RoutePath.CATALOG}/ladies_all/${id}`);
  };

  return (
    <div className={styles.cardsContainer}>
      {itemsList?.map((element: IImageCard) => (
        <div key={element.id} className={styles.card}>
          <div className={styles.imageName}>{element.name}</div>
          <button className={styles.shopButton} onClick={() => moveToItemPage(element.article)}>
            {t('Shop now')}
          </button>
          <div className={styles.imageWrap}>
            <img className={styles.imageCard} src={element.image} />
          </div>
        </div>
      ))}
    </div>
  );
};
