import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { currentUser } from '@entities/user/model/userSlice';
import { useAppSelector } from '@shared/model/reduxHooks';
import { deleteFromFavouritesDb, getFavouritesDb } from '@features/AddFavourites/api/favouritesApi';
import { useHandleError } from '@src/shared/model/useHandleError';
import { FavouriteItem } from '@entities/favouriteItem';
import { Spinner } from '@shared/ui/Spinner';
import { IFavItem } from '../model/IFavouritesList.interface';
import styles from './FavouriteList.module.scss';

export const FavouriteList = () => {
  const { t } = useTranslation();
  const [favItems, setFavItems] = useState<Record<string, IFavItem>>({});
  const { userId } = useAppSelector(currentUser);
  const handleError = useHandleError();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavouritesDb(userId!) //TO-DO SORT BY ADDING DATE
      .then((result) => {
        setFavItems(result);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => setLoading(false));
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

  return (
    <div className={styles.favouritesContainer}>
      {loading ? (
        <Spinner />
      ) : Object.values(favItems).length ? (
        Object.values(favItems)?.map((item: IFavItem) => (
          <FavouriteItem
            key={item.id}
            item={item}
            handleDeleteFromFavs={handleDeleteFromFavs}
            userId={userId!}
          />
        ))
      ) : (
        <p className={styles.noItemsText}>{t('Looks like there no items yet...')}</p>
      )}
    </div>
  );
};
