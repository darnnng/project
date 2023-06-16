import React from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryMenu } from '@src/widgets/CategoryMenu';
import { FavouriteList } from '@src/widgets/FavouriteList';
import { withPrivateRoute } from '@src/app/hocs/withPrivateRoute';
import styles from './FavouritesPage.module.scss';

const FavouritesPage = () => {
  const { t } = useTranslation('cart');

  return (
    <>
      <CategoryMenu />
      <div className={styles.pageContainer}>
        <p className={styles.pageTitle}>{t('favs')}</p>
        <FavouriteList />
      </div>
    </>
  );
};

export default withPrivateRoute(FavouritesPage);
