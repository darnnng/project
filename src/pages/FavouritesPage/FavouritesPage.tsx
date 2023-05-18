import React from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryMenu } from '@src/widgets/CategoryMenu';
import { FavouriteList } from '@src/widgets/FavouriteList';
import styles from './FavouritesPage.module.scss';

const FavouritesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <CategoryMenu />
      <div className={styles.pageContainer}>
        <p className={styles.pageTitle}>{t('Your favourites')}</p>
        <FavouriteList />
      </div>
    </>
  );
};

export default FavouritesPage;
