import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { createAlert } from '@src/redux/slices/notifierSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHooks';
import { options } from '@constants/apiOptions';
import { Spinner } from '@components/UI/Spinner';
import { currentUser } from '@src/redux/slices/userSlice';
import {
  addToFavouritesDb,
  checkIsFavourite,
  deleteFromFavouritesDb,
} from '@src/api/favouritesApi';
import { RoutePath } from '@constants/routes';
import { CategoryMenu } from '../HomePage/CategoryMenu';
import styles from './ItemPage.module.scss';
import { IArticle, IFabric, IGalleryImage, IVariantsList } from './ItemPage.interface';

const ItemPage = () => {
  const { id } = useParams();
  const { userId } = useAppSelector(currentUser); //TO-DO create useauth again maybe?
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

  useEffect(() => {
    checkIsFavourite(userId!, +id!) //TO-DO change??? (заменить на проверку exists в массиве favs из favsSlice)
      .then((result) => {
        setLiked(result);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [userId, id, liked, handleError]);

  const handleSetLike = async () => {
    if (userId == null) {
      navigate(`/${RoutePath.LOGIN}/`);
      return;
    }
    if (liked) {
      await deleteFromFavouritesDb(userId!, +id!);
      setLiked(false);
    } else {
      await addToFavouritesDb(userId!, +id!);
      setLiked(true);
    }
  };

  const galleryImages = data?.product?.articlesList[0]?.galleryDetails?.map(
    (elem: IGalleryImage) => elem.baseUrl
  ); //T0-DO менять картинки по клику на артикль
  const articlesImages = data?.product?.articlesList.map((elem: IArticle) =>
    elem.fabricSwatchThumbnails.map((elem: IFabric) => elem.baseUrl)
  );
  const links = articlesImages?.map((elem: string[]) => elem[0]);
  const sizesArray = data?.product?.articlesList.map((element: IArticle) => element.variantsList);
  const sizes = sizesArray ? sizesArray[0]?.map((elem: IVariantsList) => elem?.size?.name) : [];

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
                {links?.map((elem: string) => (
                  <img key={elem} className={styles.articleImg} src={elem} />
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
                  {liked ? t('Add to your favourites:') : t('Remove from favourites:')}
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
