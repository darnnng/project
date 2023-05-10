import React from 'react';
import { useTranslation } from 'react-i18next';
import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import styles from './FavouritesPage.module.scss';

const FavouritesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <CartBreadcrumbs />
      <div className={styles.pageContainer}>
        <p className={styles.pageTitle}>{t('Your favourites')}</p>
      </div>
    </>
  );
};

export default FavouritesPage;
