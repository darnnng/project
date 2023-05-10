import React from 'react';
import { useTranslation } from 'react-i18next';
import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.pageContainer}>
      <CartBreadcrumbs />
      <div></div>
    </div>
  );
};

export default CartPage;
