import React from 'react';
import { useTranslation } from 'react-i18next';
import poster from '@src/pages/HomePage/assets/poster.jpg';
import { CategoryMenu } from '@src/widgets/CategoryMenu';
import { ImageCards } from '@src/widgets/ImageCards';
import styles from './HomePage.module.scss';

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
