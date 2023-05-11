import React from 'react';
import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import styles from './CartPage.module.scss';

const CartPage = () => {
  return (
    <div className={styles.pageContainer}>
      <CartBreadcrumbs />
      <div></div>
    </div>
  );
};

export default CartPage;
