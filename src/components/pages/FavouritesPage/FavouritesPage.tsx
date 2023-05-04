/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks';
import { currentUser } from '@src/redux/slices/userSlice';
import { deleteFromFavouritesDb, getFavouritesDb } from '@src/api/favouritesApi';
import { createAlert } from '@src/redux/slices/notifierSlice';
import styles from './FavouritesPage.module.scss';

const FavouritesPage = () => {
  const { userId } = useAppSelector(currentUser);
  const [favItems, setFavItems] = useState([]);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleError = useCallback(
    (error: Error) => {
      dispatch(
        createAlert({
          message: error.message,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    getFavouritesDb(userId!)
      .then((result) => {
        setFavItems(result);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [userId, handleError]); //TO-DO здесь поставить как зависимость favItems

  const handleDeleteFromFavs = (userId: string, item: any) => {
    deleteFromFavouritesDb(userId!, item);
    // const { [item.id]: deletedItem, ...restOfItems } = favItems;
    // setFavItems(restOfItems as []);
    //TO-DO УДАЛИТЬ ЗДЕСЬ ИЗ favItems
  };

  const handleAddToCart = () => {
    console.log('item was added to cart');
  };

  console.log(favItems);

  return (
    <div className={styles.pageContainer}>
      <p className={styles.pageTitle}>{t('Your favourites')}</p>
      <div className={styles.favouritesContainer}>
        {Object.values(favItems)?.map((item: any) => (
          <div key={item.id} className={styles.favItem}>
            <div className={styles.itemInfo}>
              <img className={styles.favImage} src={item.picture} alt="Item image" />
              <div className={styles.pInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>{item.price}$</p>
                <p className={styles.itemPrice}>{item.id}</p>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <div
                className={styles.materialSymbolsOutlined}
                onClick={() => handleDeleteFromFavs(userId!, item)}
              >
                delete
              </div>
              <button className={styles.addButton} onClick={handleAddToCart}>
                {item.inStock ? t('Add to cart') : t('Not in stock')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
