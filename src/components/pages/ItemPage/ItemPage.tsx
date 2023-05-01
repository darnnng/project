/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { createAlert } from '@src/redux/slices/notifierSlice';
import { useAppDispatch } from '@src/hooks/reduxHooks';
import { options } from '@constants/apiOptions';
import { Spinner } from '@components/UI/Spinner';
import { CategoryMenu } from '../HomePage/CategoryMenu';
import styles from './ItemPage.module.scss';

const ItemPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=${id}`;
  const handleError = (error: Error) => {
    dispatch(
      createAlert({
        message: error.message,
      })
    );
  };
  const [isLiked, setIsLiked] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ['singleItemData', [url]],
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => handleError(error as Error),
  });

  const galleryImages = data?.product?.articlesList[0]?.galleryDetails?.map(
    (elem: any) => elem.baseUrl
  ); //T0-DO менять картинки по клику на артикль
  const articlesImages = data?.product?.articlesList.map((elem: any) =>
    elem.fabricSwatchThumbnails.map((elem: any) => elem.baseUrl)
  );
  const links = articlesImages?.map((elem: any) => elem[0]);
  const sizesArray = data?.product?.articlesList.map((element: any) => element.variantsList);
  const sizes = sizesArray ? sizesArray[0]?.map((elem: any) => elem?.size?.name) : [];

  const handleSetLike = () => {
    setIsLiked(!isLiked);
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
                <p className={styles.favouritesTitle}>Add to your favourites:</p>
                <div onClick={handleSetLike} className={styles.materialIcons}>
                  {isLiked ? 'favorite' : 'favorite_border'}
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

// data?.product?.articlesList?.map((element) => element.galleryDetails).map((elem) => elem.url);
// data?.product?.articlesList?.map((element) => element.variantsList).map((elem) => elem.name);

export default ItemPage;
