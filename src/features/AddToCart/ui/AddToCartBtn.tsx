import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@src/shared/model/reduxHooks';
import { currentUser } from '@src/entities/user/model/userSlice';
import { useHandleError } from '@src/shared/model/useHandleError';
import { useCartItem } from '@src/entities/cartItem/model/useCartItem';
import { RoutePath } from '@src/shared/constants/routes';
import { addToCartDb, checkIfIsInCart } from '../api/cartApi';
import styles from './AddToCartBtn.module.scss';

interface IAddBtnProps {
  size: string;
}

export const AddToCartBtn = memo(({ size }: IAddBtnProps) => {
  const { t } = useTranslation();
  const { userId } = useAppSelector(currentUser);
  const [added, setAdded] = useState(false);
  const handleError = useHandleError();
  const [errorMessage, setErrorMessage] = useState(false);
  console.log(size);

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
    if (userId == null) {
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
        <button className={styles.disabledAddButton}>{t('Already in your cart')}</button>
      ) : (
        <button onClick={handleAddToCart} className={styles.addButton}>
          {t('Add to cart')}
        </button>
      )}
      {errorMessage ? <p className={styles.errorText}>Please, choose size</p> : ' '}
    </div>
  );
});
