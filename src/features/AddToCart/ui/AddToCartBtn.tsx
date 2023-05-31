import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@shared/model/reduxHooks';
import { currentUser } from '@entities/user/model/userSlice';
import { useHandleError } from '@shared/model/useHandleError';
import { useCartItem } from '@entities/cartItem/model/useCartItem';
import { RoutePath } from '@shared/constants/routes';
import { Button } from '@shared/ui/Button';
import { addToCartDb, checkIfIsInCart } from '../api/cartApi';
import { IAddBtnProps } from '../model/types';
import styles from './AddToCartBtn.module.scss';

export const AddToCartBtn = memo(({ size }: IAddBtnProps) => {
  const { t } = useTranslation();
  const { userId } = useAppSelector(currentUser);
  const [added, setAdded] = useState(false);
  const handleError = useHandleError();
  const [errorMessage, setErrorMessage] = useState(false);
  const { id } = useParams();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=${id}`;
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
    if (size == '') {
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
        <Button onClick={handleAddToCart} text={t('Already in your cart')} disabled={true} />
      ) : (
        <Button onClick={handleAddToCart} text={t('Add to cart')} />
      )}
      {errorMessage ? <p className={styles.errorText}>{t('Please, choose size')}</p> : ' '}
    </div>
  );
});
