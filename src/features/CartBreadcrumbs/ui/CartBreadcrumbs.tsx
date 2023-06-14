import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from '@src/shared/constants/routes';
import styles from './CartBreadcrumbs.module.scss';

export const CartBreadcrumbs = () => {
  const { t } = useTranslation('cart');
  const location = useLocation();
  const navigate = useNavigate();

  const isSelected = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleOrderPage = () => {
    navigate(`/${RoutePath.CART}`);
  };

  return (
    <nav className={styles.navMenu}>
      <ul className={styles.crumbsList}>
        <li
          onClick={handleOrderPage}
          className={`${styles.crumb} ${isSelected(`/${RoutePath.CART}`) ? styles.selected : ''}`}
        >
          {t('orderdetails')}
        </li>
        <li>❯</li>
        <li className={` ${isSelected(`/${RoutePath.PAYMENT}`) ? styles.selected : ''}`}>
          {t('payment')}
        </li>
      </ul>
    </nav>
  );
};
