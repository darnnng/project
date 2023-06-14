import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.errorDiv}>
      <p className={styles.errorText}>{t('Oops, something went wrong!')}</p>
      <p className={styles.errorText2}>{t('Try reloading or going to the main page')}</p>
    </div>
  );
};

export default ErrorPage;
