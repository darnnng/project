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
import { InputText } from '@shared/ui/Input';
import { ValidationMessage } from '@shared/ui/ValidationMessage/ValidationMessage';
import { orderSchema } from '../lib/validationSchema';
import { IOrderFormInput } from '../model/OrderForm.interface';
import styles from './OrderForm.module.scss';

export const OrderForm = () => {
  const { t } = useTranslation('cart');
  const [price, setPrice] = useState('0');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleError = useHandleError();
  const { userId, cartItems, address } = useAppSelector(currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderFormInput>({
    mode: 'onSubmit',
    defaultValues: {
      city: address.city || '',
      street: address.street || '',
      house: address.house || '',
    },
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
    <form className={styles.orderForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.formContainer}>
        <p className={styles.orderTitle}>{t('yourOrder')}</p>

        <div className={styles.inputContainer}>
          <label htmlFor="city">{t('city')}</label>
          <InputText
            id="city"
            errors={!!errors.city?.message}
            placeholder={t('enterCity') as string}
            register={register}
            registerName={'city'}
          />
          <ValidationMessage message={t(errors.city?.message as string)} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="street">{t('street')}</label>
          <InputText
            id="street"
            errors={!!errors.city?.message}
            placeholder={t('enterStreet') as string}
            register={register}
            registerName={'street'}
          />
          <ValidationMessage message={t(errors.street?.message as string)} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="house">{t('houseNum')}</label>

          <InputText
            id="house"
            errors={!!errors.house?.message}
            placeholder={t('enterHouseNum') as string}
            register={register}
            registerName={'house'}
          />
          <ValidationMessage message={t(errors.house?.message as string)} />
        </div>
        <div className={styles.divider} />
        <div className={styles.divTotal}>
          <p className={styles.totalTitle}>
            {t('total')} <b>{price}$</b>
          </p>
        </div>
        <Button
          disabled={+price === 0 && true}
          text={t('proceedCheckout')}
          type={'submit'}
          styleProps={styles.checkoutBtn}
          variant="rounded"
        />
      </div>
    </form>
  );
};
