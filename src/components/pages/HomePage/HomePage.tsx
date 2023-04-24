import React from 'react';
import { CategoryMenu } from '@components/pages/HomePage/CategoryMenu';
import poster from '@src/assets/poster.jpg';
import styles from './HomePage.module.scss';
import { ImageCards } from './ImageCards';

const HomePage = () => {
  return (
    <div>
      <CategoryMenu />
      <img className={styles.imagePoster} src={poster} alt="poster" />
      <div className={styles.catalogContainer}>
        <div className={styles.title}>Trending now</div>
        <ImageCards />
      </div>
    </div>
  );
};

export default HomePage;
