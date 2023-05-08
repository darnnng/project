import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ISortingSelectProps } from '../model/types';
import styles from './SortingSelect.module.scss';

export const SortingSelect = ({ filter, onFilterChange }: ISortingSelectProps) => {
  const { t } = useTranslation();
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };
  return (
    <div className={styles.selectFilter}>
      <p className={styles.sortTitle}>{t('Sort by:')}</p>
      <select defaultValue={filter} className={styles.styledSelect} onChange={handleFilterChange}>
        <option value="stock">{t('Recommended')}</option>
        <option value="descPrice">{t('Highest price')}</option>
        <option value="ascPrice">{t('Lowest price')}</option>
      </select>
    </div>
  );
};
