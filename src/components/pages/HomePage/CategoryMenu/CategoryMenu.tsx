import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { options } from '@constants/apiOptions';
import { Spinner } from '@components/UI/Spinner';
import { RoutePath } from '@constants/routes';
import styles from './CategoryMenu.module.scss';
import { ICategory, ICategoryItem } from './CategoryMenu.interface';

export const CategoryMenu = () => {
  const url =
    'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=us';
  const navigate = useNavigate();

  //TO-DO TRANSLATE FROM API

  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch(url, options).then((res) => res.json())
  );

  const categoriesList = data?.map((elem: ICategory) => {
    return { name: elem.CatName, id: elem.tagCodes.join('') };
  });

  const handleClick = (category: string) => {
    navigate(`/${RoutePath.CATALOG}/${category}`);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.categoriesWrapper}>
      {categoriesList.map((category: ICategoryItem) => (
        <div
          className={styles.categoryBox}
          key={category.name}
          onClick={() => handleClick(category.id || category.name)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

//состояние загрузки передать попробовать в home page
