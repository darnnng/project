import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks';
import { currentUser } from '@src/redux/slices/userSlice';
import { deleteFromFavouritesDb, getFavouritesDb } from '@src/api/favouritesApi';
import { createAlert } from '@src/redux/slices/notifierSlice';
import { CategoryMenu } from '../HomePage/CategoryMenu';
import styles from './FavouritesPage.module.scss';
import { IFavItem } from './IFavouritesPage.interface';
import { FavouriteItem } from './FavoutiteItem';

const FavouritesPage = () => {
  const { userId } = useAppSelector(currentUser);
  const [favItems, setFavItems] = useState<Record<string, IFavItem>>({});
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
  }, [userId, handleError]);

  const handleDeleteFromFavs = (userId: string, item: IFavItem) => {
    deleteFromFavouritesDb(userId!, item)
      .then(() => {
        setFavItems((prevFavItems) => {
          const { [item.id]: deletedItem, ...restOfItems } = prevFavItems;
          return restOfItems as Record<string, IFavItem>;
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleAddToCart = () => {
    console.log('item was added to cart');
  };

  return (
    <>
      <CategoryMenu />
      <div className={styles.pageContainer}>
        <p className={styles.pageTitle}>{t('Your favourites')}</p>
        <div className={styles.favouritesContainer}>
          {Object.values(favItems).length ? (
            Object.values(favItems)?.map((item: IFavItem) => (
              <FavouriteItem
                key={item.id}
                item={item}
                handleDeleteFromFavs={handleDeleteFromFavs}
                userId={userId!}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p className={styles.noItemsText}>{t('Looks like there no items yet...')}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FavouritesPage;
