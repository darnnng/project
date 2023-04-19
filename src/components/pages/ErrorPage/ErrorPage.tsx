import React from 'react';
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  return (
    <div className={styles.errorDiv}>
      <p className={styles.errorText}>Oops, something went wrong!</p>
      <p className={styles.errorText2}>Try reloading or going to the main page</p>
    </div>
  );
};

export default ErrorPage;
