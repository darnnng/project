import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@src/shared/constants/routes';
import { useAppDispatch, useAppSelector } from '@src/shared/model/reduxHooks';
import { selectedLanguage } from '@src/features/LangChange/model/languageSlice';
import { selectedTheme } from '@src/features/ThemeChange/model/themeSlice';
import { useAuth } from '@src/features/Authorization/model/useAuth';
import { removeUser } from '@src/features/Authorization/model/userSlice';
import { ThemeChangeBtn } from '@src/features/ThemeChange';
import { LangBtn } from '@src/features/LangChange/ui/LangBtn';
import styles from './Header.module.scss';

export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(selectedLanguage);
  const { themeLight } = useAppSelector(selectedTheme);
  const isAuth = useAuth();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

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

          <LangBtn />
          <span> | </span>
          <ThemeChangeBtn />
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
          <Link to={`/${RoutePath.LIKES}`} className={styles.linkSignUp}>
            <span
              className={`${styles.materialSymbolsOutlined}  ${themeLight ? '' : styles.darkIcons}`}
            >
              favorite
            </span>
          </Link>
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
