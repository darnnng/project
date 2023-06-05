import React from 'react';
import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import { useAppSelector } from '@src/shared/model/reduxHooks';
import { currentUser } from '@src/entities/user/model/userSlice';
import styles from './CartPayment.module.scss';

const CartPaymentPage = () => {
  const { address } = useAppSelector(currentUser);
  return (
    <div className={styles.pageContainer}>
      <CartBreadcrumbs />
      <div>{address.house}</div>
      <div>{address.city}</div>
      <div>{address.street}</div>
    </div>
  );
};

export default CartPaymentPage;
