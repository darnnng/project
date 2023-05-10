import React from 'react';
import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};
