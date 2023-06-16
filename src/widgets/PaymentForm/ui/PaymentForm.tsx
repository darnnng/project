import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useAppSelector } from '@shared/model/reduxHooks';
import { currentUser } from '@entities/user/model/userSlice';
import { RoutePath } from '@shared/constants/routes';
import { useHandleSuccess } from '@shared/model/useHandleSuccess';
import { ValidationMessage } from '@shared/ui/ValidationMessage/ValidationMessage';
import { Messages } from '@shared/constants/messages';
import { IPaymentInput } from '../model/PaymentForm.interface';
import { paymentSchema } from '../lib/paymentSchema';
import { getCardTypeFromNumber } from '../lib/handleCardType';
import { createOrderDb } from '../api/paymentApi';
import styles from './PaymentForm.module.scss';

//TO-DO CHROMATIC STORYBOOK

//TO-DO линтеры?
//TO-DO ПОМЕНЯТЬ СМЕНУ ТЕМЫ

export const PaymentForm = () => {
  const { t } = useTranslation('payment');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPaymentInput>({
    mode: 'onChange',
    resolver: yupResolver(paymentSchema),
  });

  const { userId, cartItems } = useAppSelector(currentUser);
  const [cardType, setCardType] = useState('');
  const handleSuccess = useHandleSuccess();
  const navigate = useNavigate();

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cardNumber = event.target.value;
    const type = getCardTypeFromNumber(cardNumber);
    setCardType(type);
  };

  const onSubmit: SubmitHandler<IPaymentInput> = (input) => {
    console.log('Card data', input);
    createOrderDb(userId!, cartItems);
    handleSuccess(Messages.SUCCESS);
    navigate(`/${RoutePath.CATALOG}`);
  };

  return (
    <form className={styles.payForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="cardNumber">{t('cardNumber')}</label>
          <InputText
            id="cardNumber"
            errors={!!errors.cardNumber?.message}
            placeholder={t('enterCardNumber')}
            register={register}
            registerName={'cardNumber'}
            onChange={handleCardNumberChange}
            maxlength={16}
          />
          {cardType && <p className={styles.cardType}>{cardType}</p>}
          <ValidationMessage message={t(errors.cardNumber?.message as string)} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="CVC">{t('CVC')}</label>
          <InputText
            id="CVC"
            errors={!!errors.cvc?.message}
            placeholder={t('enterCVC')}
            register={register}
            registerName={'cvc'}
            maxlength={4}
          />
          <ValidationMessage message={t(errors.cvc?.message as string)} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="cardName">{t('cardName')}</label>
          <InputText
            id="cardName"
            errors={!!errors.cardName?.message}
            placeholder={t('enterCardName')}
            register={register}
            registerName={'cardName'}
          />
          <ValidationMessage message={t(errors.cardName?.message as string)} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="cardExpire">{t('expireDate')}</label>
          <InputText
            id="cardExpire"
            errors={!!errors.cardExpire?.message}
            placeholder="__/__"
            register={register}
            registerName="cardExpire"
            maxlength={4}
          />
          <ValidationMessage message={t(errors.cardExpire?.message as string)} />
        </div>
        <div className={styles.divider} />

        <Button
          text={t('checkout')}
          type={'submit'}
          styleProps={styles.checkoutBtn}
          variant="rounded"
        />
      </div>
    </form>
  );
};
