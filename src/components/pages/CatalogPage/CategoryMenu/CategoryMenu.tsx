import React, { useEffect, useState } from 'react';
import { options } from '@constants/apiOptions';
import { Spinner } from '@components/UI/Spinner';
import styles from './CategoryMenu.module.scss';

export const CategoryMenu = () => {
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=us`;
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //TO-DO TRANSLATE FROM API

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        setCategories(result);
      })
      .catch((err) => console.log(err));
  }, [url]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categoriesList = categories.map((elem: any) => {
    return { name: elem.CatName, id: elem.tagCodes.join('') };
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.categoriesWrapper}>
      {categoriesList.map((category) => (
        <div className={styles.categoryBox} key={category.name}>
          {category.name}
        </div>
      ))}
    </div>
  );
};
