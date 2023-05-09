import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AddFavButton } from '@features/AddFavourites';
import { IArticleElement } from '../model/ItemInfo.interface';
import { useSingleItem } from '../lib/useSingleItem';
import styles from './ItemInfo.module.scss';

export const ItemInfo = () => {
  const { t } = useTranslation();
  const { id, category } = useParams();
  const navigate = useNavigate();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=${id}`;
  const { articles, galleryImages, data, sizes } = useSingleItem(url, id!);

  const handleChangeArticle = (articleId: string) => {
    navigate(`/catalog/${category}/${articleId}`);
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
          <AddFavButton />
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
