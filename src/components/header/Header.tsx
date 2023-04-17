import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '@constants/routes';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header>
      <div className={styles.smallHeader}>
        <div className={styles.spanContainer}>
          <span className={styles.spanElement}>Our stores</span>
          <span> | </span>
          <span className={styles.spanElement}>Join us</span>
          <span> | </span>
          <span className={styles.spanElement}>Switch language</span>
          <span> | </span>
          <span className={styles.spanElement}>Switch theme</span>
        </div>
      </div>
      <div className={styles.bigHeader}>
        <div className={styles.iconsLeft}>
          <Link to={`/${RoutePath.CATALOG}`} className={styles.linkSignUp}>
            <span className={styles.materialSymbolsOutlined}>home</span>
            <p className={styles.mainPageLink}>Main page</p>
          </Link>
        </div>
        <h3 className={styles.mainTitle}>Threads & Co.</h3>
        <div className={styles.iconsRight}>
          <span className={styles.materialSymbolsOutlined}>shopping_cart</span>
          <span className={styles.materialSymbolsOutlined}>person</span>
        </div>
      </div>
    </header>
  );
};
