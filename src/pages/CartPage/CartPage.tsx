import React from 'react';
import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import { CartList } from '@widgets/CartItemList';
import { OrderForm } from '@widgets/OrderForm';
import styles from './CartPage.module.scss';

const CartPage = () => {
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
