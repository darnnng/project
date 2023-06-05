import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@shared/constants/routes';
import { Spinner } from '@shared/ui/Spinner';
import { Button } from '@src/shared/ui/Button';
import { IImageCard } from '../model/ImageCards.interface';
import { useImageCards } from '../model/useImageCards';
import styles from './ImageCards.module.scss';

export const ImageCards = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { itemsList, isLoading } = useImageCards();

  const moveToItemPage = (id: string) => {
    navigate(`/${RoutePath.CATALOG}/ladies_all/${id}`);
  };

  return (
    <div className={styles.cardsContainer}>
      {isLoading ? (
        <Spinner />
      ) : (
        itemsList?.map((element: IImageCard) => (
          <div key={element.id} className={styles.card}>
            <div className={styles.imageName}>{element.name}</div>
            <Button
              text={t('Shop now')}
              size="small"
              styleProps={styles.shopButton}
              onClick={() => moveToItemPage(element.article)}
            />
            <div className={styles.imageWrap}>
              <img className={styles.imageCard} src={element.image} alt={element.name} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
