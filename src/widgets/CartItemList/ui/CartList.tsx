import React from 'react';
import { useTranslation } from 'react-i18next';
import { currentUser } from '@entities/user/model/userSlice';
import { useAppSelector } from '@shared/model/reduxHooks';
import { CartItem } from '@entities/cartItem/ui/CartItem';
import { ICartItem, ICartListProps } from '../model/CartItemList.interface';
import styles from './CartList.module.scss';

export const CartList = ({ cartItems, handleDeleteFromCart }: ICartListProps) => {
  const { t } = useTranslation();
  const { userId } = useAppSelector(currentUser);

  return (
    <div className={styles.cartContainer}>
      {Object.values(cartItems).length ? (
        Object.values(cartItems)?.map((item: ICartItem) => (
          <CartItem
            key={item.id}
            item={item}
            handleDeleteFromCart={handleDeleteFromCart}
            userId={userId!}
          />
        ))
      ) : (
        <p className={styles.noItemsText}>{t('Looks like there no items yet...')}</p>
      )}
    </div>
  );
};
