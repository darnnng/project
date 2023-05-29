import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/shared/model/reduxHooks';
import { selectedTheme } from '@src/features/ThemeChange/model/themeSlice';
import { ICartItemProps } from '../model/types';
import styles from './CartItem.module.scss';

export const CartItem = ({ item, handleDeleteFromCart, userId }: ICartItemProps) => {
  const navigate = useNavigate();
  const handleSeeItem = () => {
    navigate(`/${item.id}`);
  };
  console.log(item);
  const { themeLight } = useAppSelector(selectedTheme);
  return (
    <div key={item.id} className={`${styles.cartItem}  ${themeLight ? '' : styles.darkCartItem}`}>
      <div className={styles.itemInfo}>
        <img
          className={styles.cartImage}
          src={item.picture}
          alt="Item image"
          onClick={handleSeeItem}
        />
        <div className={styles.pInfo}>
          <p className={styles.itemName}>{item.name}</p>
          <p className={styles.itemPrice}>{item.price}$</p>
          <p className={styles.itemPrice}>{item.id}</p>
          <p className={styles.itemSize}>
            SIZE: <b>{item.size}</b>
          </p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div
          className={styles.materialSymbolsOutlined}
          onClick={() => handleDeleteFromCart(userId!, item)}
        >
          delete
        </div>
      </div>
    </div>
  );
};
