import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AddFavButton } from '@features/AddFavourites';
import { useSingleItem } from '@entities/singleItem/model/useSingleItem';
import { AddToCartBtn } from '@src/features/AddToCart/ui/AddToCartBtn';
import { Button } from '@shared/ui/Button';
import { Urls } from '@shared/constants/urls';
import { IArticleElement } from '../model/ItemInfo.interface';
import styles from './ItemInfo.module.scss';

export const ItemInfo = () => {
  const { t } = useTranslation('itemPage');
  const { id, category } = useParams();
  const [size, setSize] = useState('');
  const navigate = useNavigate();
  const url = `${Urls.ITEMINFO}${id}`;
  const { articles, galleryImages, data, sizes, firebaseItem } = useSingleItem(url, id!);

  const handleChangeArticle = (articleId: string) => {
    navigate(`/catalog/${category}/${articleId}`);
  };

  const handleChangeSize = (size: string) => {
    setSize(size);
  };

  return (
    <>
      <div className={styles.upContainer}>
        <img className={styles.sliderBlock} src={galleryImages[0]} alt="Item images" />
        <div className={styles.mainInfoBlock}>
          <div className={styles.mainInfoBlockName}>{data?.product?.name}</div>
          <div className={styles.mainInfoBlockPrice}>{data?.product?.whitePrice?.price} $</div>
          <div className={styles.mainInfoBlockItem}> {t('variantsAvailable: ')} </div>
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

          <select
            onChange={(event) => handleChangeSize(event.target.value)}
            className={styles.styledSelect}
          >
            <option hidden>{t('selectSize')}</option>
            {sizes?.map((size: string) => (
              <option key={size}>{size}</option>
            ))}
          </select>
          <div className={styles.btnContainer}>
            {firebaseItem?.inStock ? (
              <AddToCartBtn size={size} />
            ) : (
              <Button text={t('outStock')} disabled={true} styleProps={styles.addButton} />
            )}
          </div>
          <AddFavButton />
        </div>
      </div>

      <div className={styles.downContainer}>
        <p className={styles.detailsTitle}>{t('details')}</p>
        {data?.product && (
          <>
            {[
              { label: data.product.articlesList[0]?.description },
              { label: t('yearProduction: '), value: data.product.yearOfProduction || '-' },
              {
                label: t('countryProduction: '),
                value: data.product.countryOfProduction || '-',
              },
              { label: t('articleNumber: '), value: data.product.code || '-' },
              { label: t('materials: '), value: data.product.keyFibreTypes || '-' },
              {
                label: t('inStock: '),
                value: data.product.inStock ? t('available') : t('notAvailable'),
              },
            ].map((item, index) => (
              <p className={styles.downContainerItem} key={index}>
                {item.label}
                <span> {item.value}</span>
              </p>
            ))}
          </>
        )}
      </div>
    </>
  );
};
