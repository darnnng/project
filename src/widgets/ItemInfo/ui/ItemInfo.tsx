import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@src/shared/model/reduxHooks';
import { currentUser } from '@src/features/Authorization/model/userSlice';
import { useHandleError } from '@src/shared/lib/useError';
import { RoutePath } from '@constants/routes';
import {
  addToFavouritesDb,
  checkIsFavourite,
  deleteFromFavouritesDb,
} from '@src/features/AddFavourites/api/favouritesApi';
import { IArticleElement } from '../model/ItemInfo.interface';
import { useSingleItem } from '../lib/useSingleItem';
import styles from './ItemInfo.module.scss';

export const ItemInfo = () => {
  const { t } = useTranslation();
  const { id, category } = useParams();
  const { userId } = useAppSelector(currentUser); //TO-DO create useauth again ?
  const [liked, setLiked] = useState(false);
  const handleError = useHandleError();
  const navigate = useNavigate();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=${id}`;
  const { articles, galleryImages, data, sizes, firebaseItem } = useSingleItem(url, id!);

  const handleChangeArticle = (articleId: string) => {
    navigate(`/catalog/${category}/${articleId}`);
  };

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
    <>
      <div className={styles.upContainer}>
        <img className={styles.sliderBlock} src={galleryImages[0]} alt="Item images" />
        <div className={styles.mainInfoBlock}>
          <div className={styles.mainInfoBlockName}>{data?.product?.name}</div>
          <div className={styles.mainInfoBlockPrice}>{data?.product?.whitePrice?.price} $</div>
          <div className={styles.mainInfoBlockItem}> {t('variants available:')} </div>
          <div className={styles.articlesOptions}>
            {articles?.map((elem: IArticleElement) => (
              <img
                key={elem.id}
                className={styles.articleImg}
                src={elem.img}
                onClick={() => handleChangeArticle(elem.id)}
              />
            ))}
          </div>

          <select className={styles.styledSelect}>
            <option hidden>{t('Select size')}</option>
            {sizes?.map((size: string) => (
              <option key={size}>{size}</option>
            ))}
          </select>
          <div className={styles.btnContainer}>
            {data?.product?.inStock ? (
              <button className={styles.addButton}>{t('Add to cart')}</button>
            ) : (
              <button className={styles.disabledAddButton} disabled>
                {t('Out of stock')}
              </button>
            )}
          </div>
          <div className={styles.favouritesContainer}>
            <p className={styles.favouritesTitle}>
              {liked ? t('Remove from favourites:') : t('Add to your favourites:')}
            </p>
            <div onClick={handleSetLike} className={styles.materialIcons}>
              {liked ? 'favorite' : 'favorite_border'}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.downContainer}>
        <p className={styles.detailsTitle}>{t('details')}</p>
        <p className={styles.downContainerItem}>
          <span>{data?.product?.articlesList[0]?.description}</span>
        </p>
        <p className={styles.downContainerItem}>
          {t('year of production:')}
          <span> {data?.product?.yearOfProduction || '-'}</span>
        </p>
        <p className={styles.downContainerItem}>
          {t('country of production:')}
          <span>{data?.product?.countryOfProduction || '-'} </span>
        </p>
        <p className={styles.downContainerItem}>
          {t('article number:')}
          <span> {data?.product?.code || '-'}</span>
        </p>
        <p className={styles.downContainerItem}>
          {t('materials: ')}
          <span> {data?.product?.keyFibreTypes || '-'}</span>
        </p>
        <p className={styles.downContainerItem}>
          {t('in stock:')}
          <span> {data?.product?.inStock ? 'available' : 'not available'}</span>
        </p>
      </div>
    </>
  );
};
