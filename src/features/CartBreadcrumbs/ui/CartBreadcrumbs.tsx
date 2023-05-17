import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { RoutePath } from '@src/shared/constants/routes';
import styles from './CartBreadcrumbs.module.scss';

export const CartBreadcrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isSelected = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={styles.navMenu}>
      <ul className={styles.crumbsList}>
        <li className={` ${isSelected(`/${RoutePath.CART}`) ? styles.selected : ''}`}>
          {t('Order details')}
        </li>
        <li>❯</li>
        <li className={` ${isSelected(`/${RoutePath.PAYMENT}`) ? styles.selected : ''}`}>
          {t('Payment')}
        </li>
      </ul>
    </nav>
  );
};
