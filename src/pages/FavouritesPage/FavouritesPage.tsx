import React from 'react';
import { useTranslation } from 'react-i18next';
import { FavouriteList } from '@src/widgets/FavouriteList/FavouriteList';
import { CategoryMenu } from '../../widgets/CategoryMenu';
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
