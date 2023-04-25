import React from 'react';
import { useAppSelector } from '@src/hooks/reduxHooks';
import { selectedTheme } from '@src/redux/slices/themeSlice';
import styles from './Spinner.module.scss';

export const Spinner = () => {
  const { themeLight } = useAppSelector(selectedTheme);
  return (
    <div className={styles.spinner}>
      <span className={styles.spinnerInner1}></span>
      <span className={styles.spinnerInner2}></span>
      <span className={`${styles.spinnerInner3}  ${themeLight ? '' : styles.darkSpinner}`}></span>
    </div>
  );
};
