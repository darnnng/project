import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@src/shared/constants/routes';
import { useAppSelector } from '@shared/model/reduxHooks';
import { currentUser } from '@entities/user/model/userSlice';
import { useHandleError } from '@src/shared/model/useHandleError';
import { orderSchema } from '../lib/validationSchema';
import { IOrderFormInput, IOrderFormProps } from '../model/OrderForm.interface';
import styles from './OrderForm.module.scss';

export const OrderForm = ({ cartItems }: IOrderFormProps) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState('0');
  const navigate = useNavigate();
  const handleError = useHandleError();
  const { userId } = useAppSelector(currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderFormInput>({
    mode: 'onSubmit',
    defaultValues: { city: '', street: '', house: '' },
    resolver: yupResolver(orderSchema),
  });

  useEffect(() => {
    let totalCost = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      if (item?.price) {
        totalCost += parseFloat(item.price);
      }
    }
    setPrice(totalCost.toFixed(2));
  }, [userId, handleError, cartItems]);

  const onSubmit = (input: IOrderFormInput) => {
    const { city, street, house } = input;
    navigate(`/${RoutePath.PAYMENT}`);

    // signInWithEmailAndPassword(auth, email, password)
    //   .then(({ user }) => {
    //     dispatch(
    //       setUser({
    //         email: user.email,
    //         id: user.uid,
    //       })
    //     );
    //     navigate(`/${RoutePath.CATALOG}`);
    //   })
    //   .catch((err) => onError(err.message));
  };

  //по клику proceed to checkout создавать заказ в котором будут свойства items,adres, price, paid:false

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.formContainer}>
        <p className={styles.orderTitle}>{t('Your order')}</p>
        <div className={styles.inputContainer}>
          <label htmlFor="city">{t('City')}</label>
          <input
            id="city"
            className={!!errors.city?.message ? styles.formErrorInput : styles.formInput}
            placeholder={t('Enter city') as string}
            type="text"
            {...register('city')}
          />
          <span role="alert" className={styles.errorMessage}>
            {errors.city?.message as string}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="street">{t('Street')}</label>
          <input
            id="street"
            className={!!errors.street?.message ? styles.formErrorInput : styles.formInput}
            placeholder={t('Enter street') as string}
            type="text"
            {...register('street')}
          />
          <span role="alert" className={styles.errorMessage}>
            {errors.street?.message as string}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="house">{t('House number')}</label>
          <input
            id="house"
            className={!!errors.house?.message ? styles.formErrorInput : styles.formInput}
            placeholder={t('Enter house number') as string}
            type="text"
            {...register('house')}
          />
          <span role="alert" className={styles.errorMessage}>
            {errors.house?.message as string}
          </span>
        </div>
        <div className={styles.divider} />
        <div className={styles.divTotal}>
          <p className={styles.totalTitle}>
            Total: <b>{price}$</b>
          </p>
        </div>
        <button className={styles.checkoutBtn} type="submit">
          {t('Proceed to checkout')}
        </button>
      </div>
    </form>
  );
};
