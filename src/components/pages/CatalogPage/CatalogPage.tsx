import React from 'react';
import { CategoryMenu } from '@components/pages/CatalogPage/CategoryMenu';
import poster from './../../../assets/poster.jpg';
import styles from './CatalogPage.module.scss';
import { ImageCards } from './ImageCards';

const CatalogPage = () => {
  return (
    <div>
      <CategoryMenu />
      <img className={styles.imagePoster} src={poster} alt="poster" />
      <div className={styles.title}>Trending now</div>
      <ImageCards />
    </div>
  );
};

export default CatalogPage;
