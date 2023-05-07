import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { createAlert } from '@src/redux/slices/notifierSlice';
import { useAppDispatch, useAppSelector } from '@src/shared/model/reduxHooks';
import { options } from '@src/shared/api/apiOptions';
import { Spinner } from '@src/shared/ui/Spinner';
import { currentUser } from '@src/redux/slices/userSlice';
import {
  addToFavouritesDb,
  checkIsFavourite,
  deleteFromFavouritesDb,
} from '@src/api/favouritesApi';
import { RoutePath } from '@src/shared/constants/routes';
import { CategoryMenu } from '../HomePage/CategoryMenu';
import styles from './ItemPage.module.scss';
import { IArticle, IArticleElement, IGalleryImage, IVariantsList } from './ItemPage.interface';

const ItemPage = () => {
  const { id, category } = useParams();
  const { userId } = useAppSelector(currentUser); //TO-DO create useauth again ?
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState(false);
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=${id}`;

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

  const { isLoading, data } = useQuery({
    queryKey: ['singleItemData', [url]],
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => handleError(error as Error),
  });

  const article = useMemo(
    () => data?.product?.articlesList.find((element: IArticle) => element?.code === id),
    [data?.product?.articlesList, id]
  );

  const firebaseItem = useMemo(
    () => ({
      id: article?.code,
      picture: article?.galleryDetails[0].baseUrl,
      price: String(article?.whitePrice.price),
      name: article?.name,
      inStock: String(data?.product?.inStock),
    }),
    [article, data?.product?.inStock]
  );

  const galleryImages = article?.galleryDetails?.map((elem: IGalleryImage) => elem.baseUrl);
  const sizes = article?.variantsList?.map((elem: IVariantsList) => elem?.size?.name) || [];
  const articles = data?.product?.articlesList.map((elem: IArticle) => ({
    id: elem?.code,
    img: elem.fabricSwatchThumbnails[0]?.baseUrl,
  }));

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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.itemPageContainer}>
          <CategoryMenu />
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
        </div>
      )}
    </>
  );
};

export default ItemPage;
