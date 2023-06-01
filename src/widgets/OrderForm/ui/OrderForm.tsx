import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@shared/constants/routes';
import { useAppDispatch, useAppSelector } from '@shared/model/reduxHooks';
import { currentUser, setAddress } from '@entities/user/model/userSlice';
import { useHandleError } from '@shared/model/useHandleError';
import { Button } from '@shared/ui/Button';
import { InputText } from '@src/shared/ui/Input';
import { orderSchema } from '../lib/validationSchema';
import { IOrderFormInput } from '../model/OrderForm.interface';
import styles from './OrderForm.module.scss';

export const OrderForm = () => {
  const { t } = useTranslation();
  const [price, setPrice] = useState('0');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleError = useHandleError();
  const { userId, cartItems } = useAppSelector(currentUser);

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

  const onSubmit: SubmitHandler<IOrderFormInput> = (input) => {
    dispatch(setAddress(input));
    navigate(`/${RoutePath.PAYMENT}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.formContainer}>
        <p className={styles.orderTitle}>{t('Your order')}</p>
        <div className={styles.inputContainer}>
          <label htmlFor="city">{t('City')}</label>
          <InputText
            id="city"
            errors={!!errors.city?.message}
            placeholder={t('Enter city') as string}
            register={register}
            registerName={'city'}
          />
          <span role="alert" className={styles.errorMessage}>
            {errors.city?.message as string}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="street">{t('Street')}</label>
          <InputText
            id="street"
            errors={!!errors.city?.message}
            placeholder={t('Enter street') as string}
            register={register}
            registerName={'street'}
          />
          <span role="alert" className={styles.errorMessage}>
            {errors.street?.message as string}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="house">{t('House number')}</label>

          <InputText
            id="house"
            errors={!!errors.house?.message}
            placeholder={t('Enter house number') as string}
            register={register}
            registerName={'house'}
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
        <Button
          text={t('Proceed to checkout')}
          type={'submit'}
          styleProps={styles.checkoutBtn}
          variant="rounded"
        />
      </div>
    </form>
  );
};
