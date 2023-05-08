import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/shared/model/reduxHooks';
import { selectedTheme, setTheme } from '../model/themeSlice';
import styles from './ThemeChange.module.scss';

export const ThemeChangeBtn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { themeLight } = useAppSelector(selectedTheme);
  const handleChangeTheme = () => {
    dispatch(setTheme());
  };
  return (
    <li
      className={` ${styles.spanElement} ${themeLight ? '' : styles.darkSpan}`}
      onClick={handleChangeTheme}
    >
      {t('Switch theme')}
    </li>
  );
};
