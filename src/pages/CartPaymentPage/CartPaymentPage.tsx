import React from 'react';
import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import styles from './CartPayment.module.scss';

const CartPaymentPage = () => {
  return (
    <div className={styles.pageContainer}>
      <CartBreadcrumbs />
      <div></div>
    </div>
  );
};

export default CartPaymentPage;
