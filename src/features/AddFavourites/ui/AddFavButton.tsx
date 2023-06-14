import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@shared/model/reduxHooks';
import { currentUser } from '@entities/user/model/userSlice';
import { RoutePath } from '@shared/constants/routes';
import { useHandleError } from '@shared/model/useHandleError';
import { useSingleItem } from '@entities/singleItem/model/useSingleItem';
import { Urls } from '@shared/constants/urls';
import { addToFavouritesDb, checkIsFavourite, deleteFromFavouritesDb } from '../api/favouritesApi';
import styles from './AddFavButton.module.scss';

export const AddFavButton = () => {
  const { userId } = useAppSelector(currentUser);
  const [liked, setLiked] = useState(false);
  const handleError = useHandleError();
  const { t } = useTranslation('itemPage');
  const { id } = useParams();
  const url = `${Urls.ITEMINFO}${id}`;

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
    if (!userId) {
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
      <p className={styles.favouritesTitle}>{liked ? t('removeFavs: ') : t('AddFavourites: ')}</p>
      <div onClick={handleSetLike} className={styles.materialIcons}>
        {liked ? 'favorite' : 'favorite_border'}
      </div>
    </div>
  );
};
