import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IFavouriteItemsProps } from '../model/FavouriteItem.interface';
import styles from './FavouriteItem.module.scss';

export const FavouriteItem = ({ item, handleDeleteFromFavs, userId }: IFavouriteItemsProps) => {
  const navigate = useNavigate();
  const handleSeeItem = () => {
    navigate(`/${item.id}`);
  };

  return (
    <div key={item.id} className={styles.favItem}>
      <div className={styles.itemInfo}>
        <img
          className={styles.favImage}
          src={item.picture}
          alt="Item image"
          onClick={handleSeeItem}
        />
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
      </div>
    </div>
  );
};

export default FavouriteItem;
