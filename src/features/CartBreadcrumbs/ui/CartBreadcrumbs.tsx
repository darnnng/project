/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from '@src/shared/constants/routes';
import styles from './CartBreadcrumbs.module.scss';

export const CartBreadcrumbs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSeeDetails = () => {
    navigate(`/${RoutePath.CART}`);
  };
  const handlePayment = () => {
    navigate(`/${RoutePath.PAYMENT}`);
  };

  const isSelected = (path: any) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={styles.navMenu}>
      <ul className={styles.crumbsList}>
        <li
          className={`${styles.crumbItem} ${
            isSelected(`/${RoutePath.CART}`) ? styles.selected : ''
          }`}
          onClick={handleSeeDetails}
        >
          {t('Order details')}
        </li>
        <li className={styles.crumbItem}>❯</li>
        <li
          className={`${styles.crumbItem} ${
            isSelected(`/${RoutePath.PAYMENT}`) ? styles.selected : ''
          }`}
          onClick={handlePayment}
        >
          {t('Payment')}
        </li>
      </ul>
    </nav>
  );
};
