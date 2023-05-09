import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@shared/model/reduxHooks';
import { currentUser } from '@entities/user/model/userSlice';
import { RoutePath } from '@shared/constants/routes';
import { useSingleItem } from '@src/entities/item/model/useSingleItem';
import { useHandleError } from '@shared/model/useHandleError';
import { addToFavouritesDb, checkIsFavourite, deleteFromFavouritesDb } from '../api/favouritesApi';
import styles from './AddFavButton.module.scss';

export const AddFavButton = () => {
  const { userId } = useAppSelector(currentUser);
  const [liked, setLiked] = useState(false);
  const handleError = useHandleError();
  const { t } = useTranslation();
  const { id } = useParams();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=${id}`;
  const navigate = useNavigate();
  const { firebaseItem } = useSingleItem(url, id!);

  useEffect(() => {
    checkIsFavourite(userId!, firebaseItem)
      .then((result) => {
        setLiked(result);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [userId, liked, handleError, firebaseItem]);

  const handleSetLike = async () => {
    if (userId == null) {
      navigate(`/${RoutePath.LOGIN}/`);
      return;
    }
    if (liked) {
      await deleteFromFavouritesDb(userId!, firebaseItem);
      setLiked(false);
    } else {
      await addToFavouritesDb(userId!, firebaseItem);
      setLiked(true);
    }
  };
  return (
    <div className={styles.favouritesContainer}>
      <p className={styles.favouritesTitle}>
        {liked ? t('Remove from favourites:') : t('Add to your favourites:')}
      </p>
      <div onClick={handleSetLike} className={styles.materialIcons}>
        {liked ? 'favorite' : 'favorite_border'}
      </div>
    </div>
  );
};
