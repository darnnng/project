import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@shared/model/reduxHooks';
import { currentUser } from '@entities/user/model/userSlice';
import { useHandleError } from '@shared/model/useHandleError';
import { useCartItem } from '@entities/cartItem/model/useCartItem';
import { RoutePath } from '@shared/constants/routes';
import { Button } from '@shared/ui/Button';
import { Urls } from '@shared/constants/urls';
import { addToCartDb, checkIfIsInCart } from '../api/cartApi';
import { IAddBtnProps } from '../model/types';
import styles from './AddToCartBtn.module.scss';

export const AddToCartBtn = memo(({ size }: IAddBtnProps) => {
  const { t } = useTranslation('itemPage');
  const { userId } = useAppSelector(currentUser);
  const [added, setAdded] = useState(false);
  const handleError = useHandleError();
  const [errorMessage, setErrorMessage] = useState(false);
  const { id } = useParams();
  const url = `${Urls.ITEMINFO}${id}`;
  const navigate = useNavigate();
  const { cartItem } = useCartItem(url, id!, size);

  useEffect(() => {
    checkIfIsInCart(userId!, cartItem)
      .then((result) => {
        setAdded(result);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [userId, handleError, cartItem]);

  const handleAddToCart = async () => {
    if (!userId) {
      navigate(`/${RoutePath.LOGIN}/`);
      return;
    }
    if (!size) {
      setErrorMessage(true);
      return;
    }
    await addToCartDb(userId!, cartItem);
    setErrorMessage(false);
    setAdded(true);
  };

  return (
    <div className={styles.addBtnContainer}>
      {added ? (
        <Button text={t('alreadyCart')} disabled={true} styleProps={styles.addButton} />
      ) : (
        <Button text={t('AddCart')} styleProps={styles.addButton} onClick={handleAddToCart} />
      )}
      {errorMessage ? <p className={styles.errorText}>{t('chooseSize')}</p> : ' '}
    </div>
  );
});
