import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { currentUser, setCartItems } from '@entities/user/model/userSlice';
import { useAppDispatch, useAppSelector } from '@shared/model/reduxHooks';
import { CartItem } from '@entities/cartItem/ui/CartItem';
import { deleteFromCartDb, getItemsFromCart } from '@src/features/AddToCart/api/cartApi';
import { useHandleError } from '@shared/model/useHandleError';
import { Spinner } from '@shared/ui/Spinner';
import { ICartItem } from '@src/shared/model/interfaces/interfaces';
import styles from './CartList.module.scss';

export const CartList = () => {
  const { t } = useTranslation('cart');
  const { userId, cartItems } = useAppSelector(currentUser);
  const handleError = useHandleError();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItemsFromCart(userId!) //TO-DO SORT BY ADDING DATE
      .then((result) => {
        dispatch(setCartItems(result));
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => setLoading(false));
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
      {loading ? (
        <Spinner />
      ) : cartItems && Object.values(cartItems).length ? (
        Object.values(cartItems).map((item: ICartItem) => (
          <CartItem
            key={item.id}
            item={item}
            handleDeleteFromCart={handleDeleteFromCart}
            userId={userId!}
          />
        ))
      ) : (
        <p className={styles.noItemsText}>{t('noitems')}</p>
      )}
    </div>
  );
};
