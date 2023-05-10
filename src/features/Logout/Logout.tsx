import React from 'react';
import { useAppDispatch, useAppSelector } from '@src/shared/model/reduxHooks';
import { selectedTheme } from '@src/features/ThemeChange/model/themeSlice';
import { removeUser } from '@entities/user/model/userSlice';
import styles from './Logout.module.scss';

export const Logout = () => {
  const dispatch = useAppDispatch();
  const { themeLight } = useAppSelector(selectedTheme);
  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <span
      onClick={handleLogout}
      className={`${styles.materialSymbolsOutlined}  ${themeLight ? '' : styles.darkIcons}`}
    >
      logout
    </span>
  );
};
