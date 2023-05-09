import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@shared/constants/routes';
import { IImageCard } from '../model/ImageCards.interface';
import { useImageCards } from '../model/useImageCards';
import styles from './ImageCards.module.scss';

export const ImageCards = () => {
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=3&categories=ladies_all`;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { itemsList } = useImageCards(url);

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
