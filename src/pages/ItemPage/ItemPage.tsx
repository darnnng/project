import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@shared/ui/Spinner';
import { ItemInfo } from '@widgets/ItemInfo';
import { useSingleItem } from '@entities/singleItem/model/useSingleItem';
import { CategoryMenu } from '@widgets/CategoryMenu';
import { Urls } from '@src/shared/constants/urls';
import styles from './ItemPage.module.scss';

const ItemPage = () => {
  const { id } = useParams();
  const url = `${Urls.ITEMINFO}${id}`;

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
