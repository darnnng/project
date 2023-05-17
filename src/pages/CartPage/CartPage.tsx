import React from 'react';
import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import { CartList } from '@widgets/CartItemList';
import { OrderForm } from '@widgets/OrderForm';
import { useAppSelector } from '@shared/model/reduxHooks';
import { currentUser } from '@entities/user/model/userSlice';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const { userId } = useAppSelector(currentUser);
  console.log(userId);

  return (
    <div className={styles.pageContainer}>
      <CartBreadcrumbs />
      <div className={styles.orderContainer}>
        <CartList />
        <OrderForm />
      </div>
    </div>
  );
};

export default CartPage;
