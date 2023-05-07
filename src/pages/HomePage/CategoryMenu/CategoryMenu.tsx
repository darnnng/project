import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { options } from '@src/shared/api/apiOptions';
import { RoutePath } from '@src/shared/constants/routes';
import { useAppDispatch } from '@src/shared/model/reduxHooks';
import { createAlert } from '@src/redux/slices/notifierSlice';
import styles from './CategoryMenu.module.scss';
import { ICategory, ICategoryItem } from './CategoryMenu.interface';

export const CategoryMenu = () => {
  const url =
    'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=us';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleError = (error: Error) => {
    dispatch(
      createAlert({
        message: error.message,
      })
    );
  };

  const { data: catData } = useQuery({
    queryKey: 'categoriesData',
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => handleError(error as Error),
  });

  const categoriesList = catData?.map((elem: ICategory) => {
    return { name: elem.CatName, id: elem.tagCodes.join('') };
  });

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
