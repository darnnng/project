import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from '@src/shared/constants/languages';
import { setLanguage } from '@src/features/LangChange/model/languageSlice';
import { useAppDispatch, useAppSelector } from '@src/shared/model/reduxHooks';
import { selectedTheme } from '@src/features/ThemeChange/model/themeSlice';
import styles from './LangBtn.module.scss';

export const LangBtn = () => {
  const dispatch = useAppDispatch();
  const { themeLight } = useAppSelector(selectedTheme);
  const { t } = useTranslation();
  const handleSetEng = () => {
    dispatch(setLanguage(Languages.EN));
  };

  const handleSetRus = () => {
    dispatch(setLanguage(Languages.RU));
  };
  return (
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
  );
};
