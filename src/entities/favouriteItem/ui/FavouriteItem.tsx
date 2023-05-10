import React from 'react';
import { useTranslation } from 'react-i18next';
import { IFavouriteItemsProps } from '../model/FavouriteItem.interface';
import styles from './FavouriteItem.module.scss';

export const FavouriteItem = ({
  item,
  handleDeleteFromFavs,
  userId,
  handleAddToCart,
}: IFavouriteItemsProps) => {
  const { t } = useTranslation();
  //TO-DO MAKE NOT IN STOCK GRAY COLOR

  return (
    <div key={item.id} className={styles.favItem}>
      <div className={styles.itemInfo}>
        <img className={styles.favImage} src={item.picture} alt="Item image" />
        <div className={styles.pInfo}>
          <p className={styles.itemName}>{item.name}</p>
          <p className={styles.itemPrice}>{item.price}$</p>
          <p className={styles.itemPrice}>{item.id}</p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div
          className={styles.materialSymbolsOutlined}
          onClick={() => handleDeleteFromFavs(userId!, item)}
        >
          delete
        </div>
        {item.inStock === 'false' ? (
          <button className={styles.disabledAddButton} disabled>
            {t('Not in stock')}
          </button>
        ) : (
          <button className={styles.addButton} onClick={handleAddToCart}>
            {t('Add to cart')}
          </button>
        )}
      </div>
    </div>
  );
};

export default FavouriteItem;
