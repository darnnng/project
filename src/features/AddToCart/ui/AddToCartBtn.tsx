import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddToCartBtn.module.scss';

export const AddToCartBtn = () => {
  const { t } = useTranslation();
  const handleAddButton = () => {
    console.log('added');
  };
  return (
    <button onClick={handleAddButton} className={styles.addButton}>
      {t('Add to cart')}
    </button>
  );
};
