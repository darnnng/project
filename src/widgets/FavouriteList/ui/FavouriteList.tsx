import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { currentUser } from '@entities/user/model/userSlice';
import { useAppSelector } from '@shared/model/reduxHooks';
import { deleteFromFavouritesDb, getFavouritesDb } from '@features/AddFavourites/api/favouritesApi';
import { useHandleError } from '@src/shared/model/useHandleError';
import { FavouriteItem } from '../../FavouriteItem';
import { IFavItem } from '../model/IFavouritesList.interface';
import styles from './FavouriteList.module.scss';

export const FavouriteList = () => {
  const { t } = useTranslation();
  const [favItems, setFavItems] = useState<Record<string, IFavItem>>({});
  const { userId } = useAppSelector(currentUser);
  const handleError = useHandleError();

  useEffect(() => {
    getFavouritesDb(userId!) //TO-DO SORT BY ADDING DATE
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
    console.log('item was added to cart'); //TO-DO IMLEMENT CART
  };

  return (
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
  );
};
