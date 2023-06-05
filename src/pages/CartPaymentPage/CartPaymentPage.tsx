import React from 'react';
import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import { useAppSelector } from '@shared/model/reduxHooks';
import { currentUser } from '@entities/user/model/userSlice';
import { PaymentForm } from '@widgets/PaymentForm';
import styles from './CartPayment.module.scss';

const CartPaymentPage = () => {
  const { address } = useAppSelector(currentUser);
  return (
    <div className={styles.pageContainer}>
      <CartBreadcrumbs />
      <div>{address.house}</div>
      <div>{address.city}</div>
      <div>{address.street}</div>
      <PaymentForm />
    </div>
  );
};

export default CartPaymentPage;
