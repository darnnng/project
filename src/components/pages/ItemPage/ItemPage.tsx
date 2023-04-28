/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { createAlert } from '@src/redux/slices/notifierSlice';
import { useAppDispatch } from '@src/hooks/reduxHooks';
import { options } from '@constants/apiOptions';
import { Spinner } from '@components/UI/Spinner';
import { CategoryMenu } from '../HomePage/CategoryMenu';
import styles from './ItemPage.module.scss';

const ItemPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=${id}`;
  const handleError = (error: Error) => {
    dispatch(
      createAlert({
        message: error.message,
      })
    );
  };

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

  console.log(links);

  // console.log(
  //   'articles',
  //   data?.product?.articlesList.map((elem: any) =>
  //     elem.fabricSwatchThumbnails.map((elem: any) => elem.baseUrl)
  //   )
  // );

  console.log(
    data?.product?.articlesList?.map((element: any) => element.galleryDetails)
    //?.map((elem: any) => elem.url)
  );

  links?.map((elem: string) => {
    console.log(elem);
  });

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
              <div className={styles.mainInfoBlockItem}> colors available:</div>
              {links.map((elem: string) => {
                <img className={styles.articleImg} src={elem} />;
              })}
              <select className={styles.styledSelect}>
                <option hidden>Select size</option>
                <option>xl</option>
                <option>xl</option>
                <option>xl</option>
              </select>
              <div className={styles.btnContainer}>
                <button className={styles.addButton}>Add to cart</button>
                <button className={styles.likeButton}>like</button>
              </div>
            </div>
          </div>
          <div className={styles.downContainer}>
            <p className={styles.detailsTitle}>details</p>
            <p className={styles.downContainerItem}>
              <span>{data?.product?.articlesList[0]?.description}</span>
            </p>
            <p className={styles.downContainerItem}>
              year of production:<span> {data?.product?.yearOfProduction}</span>
            </p>
            <p className={styles.downContainerItem}>
              country of production: <span>{data?.product?.countryOfProduction}</span>
            </p>
            <p className={styles.downContainerItem}>
              article number:<span> {data?.product?.code}</span>
            </p>
            <p className={styles.downContainerItem}>
              materials: <span> {data?.product?.keyFibreTypes}</span>
            </p>
            <p className={styles.downContainerItem}>
              in stock: <span> {data?.product?.inStock ? 'available' : 'not available'}</span>
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
