import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks';
import { selectedLanguage, setLanguage } from '@src/redux/slices/languageSlice';
import { Languages } from '@constants/languages';
import styles from './Header.module.scss';

export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(selectedLanguage);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const handleSetEng = () => {
    dispatch(setLanguage(Languages.EN));
  };

  const handleSetRus = () => {
    dispatch(setLanguage(Languages.RU));
  };

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
                <a onClick={handleSetEng}>EN</a>
              </li>
              <li>
                <a onClick={handleSetRus}>RU</a>
              </li>
            </ul>
          </li>
          <span> | </span>
          <li className={styles.spanElement}>
            <a>{t('Switch theme')}</a>
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
