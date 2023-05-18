import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { currentUser, setCartItems } from '@entities/user/model/userSlice';
import { useAppDispatch, useAppSelector } from '@shared/model/reduxHooks';
import { CartItem } from '@entities/cartItem/ui/CartItem';
import { deleteFromCartDb, getItemsFromCart } from '@src/features/AddToCart/api/cartApi';
import { useHandleError } from '@shared/model/useHandleError';
import { ICartItem } from '@entities/cartItem/model/types';
import styles from './CartList.module.scss';

export const CartList = () => {
  const { t } = useTranslation();
  const { userId, cartItems } = useAppSelector(currentUser);
  const handleError = useHandleError();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getItemsFromCart(userId!) //TO-DO SORT BY ADDING DATE
      .then((result) => {
        dispatch(setCartItems(result));
      })
      .catch((error) => {
        handleError(error);
      });
  }, [userId, handleError, dispatch]);

  const handleDeleteFromCart = (userId: string, item: ICartItem) => {
    deleteFromCartDb(userId!, item)
      .then(() => {
        const updatedItems = { ...cartItems };
        delete updatedItems[item.id];
        dispatch(setCartItems(updatedItems));
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className={styles.cartContainer}>
      {cartItems && Object.values(cartItems).length ? (
        Object.values(cartItems)?.map((item: ICartItem) => (
          <CartItem
            key={item.id}
            item={item}
            handleDeleteFromCart={handleDeleteFromCart}
            userId={userId!}
          />
        ))
      ) : (
        <p className={styles.noItemsText}>{t('Looks like there are no items yet...')}</p>
      )}
    </div>
  );
};
