import React, { useEffect, useState } from 'react';
import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import { CartList } from '@widgets/CartItemList';
import { OrderForm } from '@widgets/OrderForm';
import { useHandleError } from '@shared/model/useHandleError';
import { deleteFromCartDb, getItemsFromCart } from '@features/AddToCart/api/cartApi';
import { useAppSelector } from '@shared/model/reduxHooks';
import { currentUser } from '@entities/user/model/userSlice';
import { ICartItem } from '@entities/cartItem/model/types';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const handleError = useHandleError();
  const { userId } = useAppSelector(currentUser);
  const [cartItems, setCartItems] = useState<Record<string, ICartItem>>({});

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
    <div className={styles.pageContainer}>
      <CartBreadcrumbs />
      <div className={styles.orderContainer}>
        <CartList cartItems={cartItems} handleDeleteFromCart={handleDeleteFromCart} />
        <OrderForm cartItems={cartItems} />
      </div>
    </div>
  );
};

export default CartPage;
