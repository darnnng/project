import React from 'react';
import styles from './CatalogItem.module.scss';
import { ICatalogItemProps } from './CatalogItem.interface';

export const CatalogItem = ({ item }: ICatalogItemProps) => {
  return (
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
  );
};
