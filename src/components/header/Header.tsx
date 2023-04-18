import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@constants/routes';
import styles from './Header.module.scss';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <nav className={styles.smallHeader}>
        <ul className={styles.spanContainer}>
          <li className={styles.spanElement}>
            <Link to={`/${RoutePath.CATALOG}`}>{t('Our stores')}</Link>
          </li>
          <span> | </span>
          <li className={styles.spanElement}>
            <Link to={`/${RoutePath.SIGNUP}`}>{t('Join us')}</Link>
          </li>
          <span> | </span>

          <li className={styles.spanElement}>
            <a>{t('Switch language')}</a>
            <ul>
              <li>
                <a href="#">EN</a>
              </li>
              <li>
                <a href="#">RU</a>
              </li>
            </ul>
          </li>
          <span> | </span>
          <li className={styles.spanElement}>
            <a href="#">{t('Switch theme')}</a>
            <ul>
              <li>
                <span className={styles.materialSymbolsOutlined}>light_mode</span>
              </li>
              <li>
                <span className={styles.materialSymbolsOutlined}>dark_mode</span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className={styles.bigHeader}>
        <div className={styles.iconsLeft}>
          <Link to={`/${RoutePath.CATALOG}`} className={styles.linkSignUp}>
            <span className={styles.materialSymbolsOutlined}>home</span>
            <p className={styles.mainPageLink}>{t('Main page')}</p>
          </Link>
        </div>
        <h3 className={styles.mainTitle}>Threads & Co.</h3>
        <div className={styles.iconsRight}>
          <span className={styles.materialSymbolsOutlined}>
            <Link to={`/${RoutePath.BASKET}`} className={styles.linkSignUp}>
              shopping_cart
            </Link>
          </span>
          <span className={styles.materialSymbolsOutlined}>person</span>
        </div>
      </div>
    </header>
  );
};
