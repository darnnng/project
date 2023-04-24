import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks';
import { selectedLanguage, setLanguage } from '@src/redux/slices/languageSlice';
import { Languages } from '@constants/languages';
import { selectedTheme, setTheme } from '@src/redux/slices/themeSlice';
import { currentUser, removeUser } from '@src/redux/slices/userSlice';
import styles from './Header.module.scss';

export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(selectedLanguage);
  const { themeLight } = useAppSelector(selectedTheme);
  const { isAuth } = useAppSelector(currentUser);
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

  const handleChangeTheme = () => {
    dispatch(setTheme());
  };

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <header>
      <nav className={`${styles.smallHeader}  ${themeLight ? '' : styles.darkHeader}`}>
        <ul className={styles.spanContainer}>
          <li className={`${styles.spanElement}  ${themeLight ? '' : styles.darkSpan}`}>
            <Link to={`/${RoutePath.STORES}`} className={`${themeLight ? '' : styles.darkLink}`}>
              {t('Our stores')}
            </Link>
          </li>
          <span> | </span>
          {!isAuth && (
            <>
              <li className={styles.spanElement}>
                <Link
                  to={`/${RoutePath.SIGNUP}`}
                  className={`${themeLight ? '' : styles.darkLink}`}
                >
                  {t('Join us')}
                </Link>
              </li>
              <span> | </span>
            </>
          )}

          <li className={styles.spanElement}>
            <a className={`${themeLight ? '' : styles.darkLink}`}>{t('Switch language')}</a>
            <ul>
              <li>
                <a className={`${themeLight ? '' : styles.darkLang}`} onClick={handleSetEng}>
                  EN
                </a>
              </li>
              <li>
                <a className={`${themeLight ? '' : styles.darkLang}`} onClick={handleSetRus}>
                  RU
                </a>
              </li>
            </ul>
          </li>
          <span> | </span>
          <li
            className={` ${styles.spanElement} ${themeLight ? '' : styles.darkSpan}`}
            onClick={handleChangeTheme}
          >
            {t('Switch theme')}
          </li>
        </ul>
      </nav>
      <div className={`${styles.bigHeader}  ${themeLight ? '' : styles.darkHeader}`}>
        <div className={styles.iconsLeft}>
          <Link to={`/${RoutePath.CATALOG}`} className={styles.linkSignUp}>
            <span
              className={`${styles.materialSymbolsOutlined}  ${themeLight ? '' : styles.darkIcons}`}
            >
              home
            </span>
            <p className={`${styles.mainPageLink}  ${themeLight ? '' : styles.darkIcons}`}>
              {t('Main page')}
            </p>
          </Link>
        </div>
        <h3 className={styles.mainTitle}>Threads & Co.</h3>
        <div className={styles.iconsRight}>
          <Link to={`/${RoutePath.BASKET}`} className={styles.linkSignUp}>
            <span
              className={`${styles.materialSymbolsOutlined}  ${themeLight ? '' : styles.darkIcons}`}
            >
              shopping_cart
            </span>
          </Link>
          <span
            className={`${styles.materialSymbolsOutlined}  ${themeLight ? '' : styles.darkIcons}`}
          >
            favorite
          </span>
          {isAuth && (
            <span
              onClick={handleLogout}
              className={`${styles.materialSymbolsOutlined}  ${themeLight ? '' : styles.darkIcons}`}
            >
              logout
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
