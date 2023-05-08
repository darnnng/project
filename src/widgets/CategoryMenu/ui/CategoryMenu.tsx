import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@src/shared/constants/routes';
import { useCategoriesList } from '../lib/useCategories';
import { ICategoryItem } from '../model/CategoryMenu.interface';
import styles from './CategoryMenu.module.scss';

export const CategoryMenu = () => {
  const navigate = useNavigate();
  const categoriesList = useCategoriesList();
  const handleClick = (category: string) => {
    navigate(`/${RoutePath.CATALOG}/${category}`);
  };

  return (
    <div className={styles.categoriesWrapper}>
      {categoriesList?.map((category: ICategoryItem) => (
        <div
          className={styles.categoryBox}
          key={category.name}
          onClick={() => handleClick(category.id || category.name)}
        >
          {category.name}
        </div>
      )) || []}
    </div>
  );
};
