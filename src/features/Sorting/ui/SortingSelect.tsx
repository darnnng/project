import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { SortingOptions } from '@shared/constants/sortingOptions';
import { ISortingSelectProps } from '../model/types';
import styles from './SortingSelect.module.scss';

export const SortingSelect = ({ filter, onFilterChange }: ISortingSelectProps) => {
  const { t } = useTranslation('catalog');
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };
  return (
    <div className={styles.selectFilter}>
      <p className={styles.sortTitle}>{t('sort')}</p>
      <select defaultValue={filter} className={styles.styledSelect} onChange={handleFilterChange}>
        <option value={SortingOptions.STOCK}>{t('recommended')}</option>
        <option value={SortingOptions.DESCPRICE}>{t('highest')}</option>
        <option value={SortingOptions.ASCPRICE}>{t('lowest')}</option>
      </select>
    </div>
  );
};
