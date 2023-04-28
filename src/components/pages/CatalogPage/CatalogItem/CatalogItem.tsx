import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@constants/routes';
import styles from './CatalogItem.module.scss';
import { ICatalogItemProps } from './CatalogItem.interface';

export const CatalogItem = ({ item, category }: ICatalogItemProps) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/${RoutePath.CATALOG}/${category}/${id}`);
    console.log(id);
  };
  return (
    <div key={item.id} className={styles.card}>
      <img className={styles.imageCard} src={item.image} onClick={() => handleClick(item.id)} />
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
  );
};
