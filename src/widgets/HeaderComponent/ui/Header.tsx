import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@shared/constants/routes';
import { useAppSelector } from '@shared/model/reduxHooks';
import { selectedLanguage } from '@features/LangChange/model/languageSlice';
import { selectedTheme } from '@features/ThemeChange/model/themeSlice';
import { useAuth } from '@entities/user/model/useAuth';
import { ThemeChangeBtn } from '@features/ThemeChange';
import { LangBtn } from '@features/LangChange/ui/LangBtn';
import { Logout } from '@features/Logout';
import { routeLinks } from '../model/routeLinks';
import styles from './Header.module.scss';

export const Header = () => {
  const { t } = useTranslation();
  const { language } = useAppSelector(selectedLanguage);
  const { themeLight } = useAppSelector(selectedTheme);
  const isAuth = useAuth();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return (
    <header>
      <nav className={`${styles.smallHeader}  ${themeLight ? '' : styles.darkHeader}`}>
        <ul className={styles.spanContainer}>
          <li className={`${styles.spanElement}  ${themeLight ? '' : styles.darkSpan}`}>
            <Link to={`/${RoutePath.MAPS}`} className={`${themeLight ? '' : styles.darkLink}`}>
              {t('ourstores')}
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
                  {t('joinus')}
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
              {t('mainpage')}
            </p>
          </Link>
        </div>
        <h3 className={styles.mainTitle}>Threads & Co.</h3>
        <div className={styles.iconsRight}>
          {routeLinks.map((item, index) => (
            <React.Fragment key={index}>
              <Link to={item.path} className={styles.linkSignUp}>
                <span
                  className={`${styles.materialSymbolsOutlined} ${
                    themeLight ? '' : styles.darkIcons
                  }`}
                >
                  {item.icon}
                </span>
              </Link>
            </React.Fragment>
          ))}
          {isAuth && <Logout />}
        </div>
      </div>
    </header>
  );
};
