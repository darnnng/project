import React from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryMenu } from '@components/pages/HomePage/CategoryMenu';
import poster from '@src/assets/poster.jpg';
import styles from './HomePage.module.scss';
import { ImageCards } from './ImageCards';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <CategoryMenu />
      <img className={styles.imagePoster} src={poster} alt="poster" />
      <div className={styles.catalogContainer}>
        <div className={styles.title}>{t('Trending now')}</div>
        <ImageCards />
      </div>
    </>
  );
};

export default HomePage;
