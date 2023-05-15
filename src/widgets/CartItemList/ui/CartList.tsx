import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { currentUser } from '@entities/user/model/userSlice';
import { useAppSelector } from '@shared/model/reduxHooks';
import { useHandleError } from '@shared/model/useHandleError';
import { deleteFromCartDb, getItemsFromCart } from '@features/AddToCart/api/cartApi';
import { CartItem } from '@entities/cartItem/ui/CartItem';
import { ICartItem } from '../model/CartItemList.interface';
import styles from './CartList.module.scss';

export const CartList = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState<Record<string, ICartItem>>({});
  const { userId } = useAppSelector(currentUser);
  const handleError = useHandleError();

  useEffect(() => {
    getItemsFromCart(userId!) //TO-DO SORT BY ADDING DATE
      .then((result) => {
        setCartItems(result);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [userId, handleError]);

  const handleDeleteFromCart = (userId: string, item: ICartItem) => {
    deleteFromCartDb(userId!, item)
      .then(() => {
        setCartItems((prevCartItems) => {
          const { [item.id]: deletedItem, ...restOfItems } = prevCartItems;
          return restOfItems as Record<string, ICartItem>;
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className={styles.cartContainer}>
      {Object.values(cartItems).length ? (
        Object.values(cartItems)?.map((item: ICartItem) => (
          <CartItem
            key={item.id}
            item={item}
            handleDeleteFromCart={handleDeleteFromCart}
            userId={userId!}
          />
        ))
      ) : (
        <p className={styles.noItemsText}>{t('Looks like there no items yet...')}</p>
      )}
    </div>
  );
};
