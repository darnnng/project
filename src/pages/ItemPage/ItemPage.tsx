import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@src/shared/ui/Spinner';
import { useSingleItem } from '@src/entities/item/model/useSingleItem';
import { ItemInfo } from '@src/widgets/ItemInfo';
import { CategoryMenu } from '../../widgets/CategoryMenu';
import styles from './ItemPage.module.scss';

const ItemPage = () => {
  const { id } = useParams();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=${id}`;
  const { isLoading } = useSingleItem(url, id!);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.itemPageContainer}>
          <CategoryMenu />
          <ItemInfo />
        </div>
      )}
    </>
  );
};

export default ItemPage;
