/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks';
import { currentUser } from '@src/redux/slices/userSlice';
import { deleteFromFavouritesDb, getFavouritesDb } from '@src/api/favouritesApi';
import { createAlert } from '@src/redux/slices/notifierSlice';
import styles from './FavouritesPage.module.scss';

const FavouritesPage = () => {
  const { userId } = useAppSelector(currentUser);
  const [favItems, setFavItems] = useState([]);
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
  }, [userId, handleError]);

  const handleDeleteFromFavs = (itemId: number) => {
    deleteFromFavouritesDb(userId!, itemId);
  };

  return (
    <div className={styles.pageContainer}>
      <p className={styles.pageTitle}>Your favourites</p>
      <div className={styles.favouritesContainer}>
        {favItems?.map((item: any) => (
          <div key={item.id} className={styles.favItem}>
            <div className={styles.itemInfo}>
              <div className={styles.favImage} />
              <div className={styles.pInfo}>
                <p className={styles.itemName}>Name of the item</p>
                <p className={styles.itemPrice}>25.99$</p>
                <p className={styles.itemPrice}>010101010</p>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button>Delete</button>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
