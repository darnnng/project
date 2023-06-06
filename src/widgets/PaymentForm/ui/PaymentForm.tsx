/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { InputText } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { IPaymentInput } from '../model/PaymentForm.interface';
import { paymentSchema } from '../lib/paymentSchema';
import { getCardTypeFromNumber } from '../lib/handleCardType';
import styles from './PaymentForm.module.scss';

//TO-DO CHROMATIC STORYBOOK
//TO-DO ACTIONS НА github
//TO-DO линтеры?
//TO-DO разобрать перевод по страницам
//TO-DO разобрать конфиг webpack с i18n
//item page верстку подфиксить

//TO-DO форму сделать с валидацией
//сделать api для firebase чтоб заказ создавался
//убрать лишние dependency

//доделать переводы в приципе

export const PaymentForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPaymentInput>({
    mode: 'onChange',
    resolver: yupResolver(paymentSchema),
  });

  const [cardType, setCardType] = useState('');

  const handleCardNumberChange = (event: any) => {
    const cardNumber = event.target.value;
    const type = getCardTypeFromNumber(cardNumber);
    setCardType(type);
  };

  const onSubmit: SubmitHandler<IPaymentInput> = (input) => {
    console.log(input);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="cardNumber">{t('Card number')}</label>
          <InputText
            id="cardNumber"
            errors={!!errors.cardNumber?.message}
            placeholder={t('Enter card number') as string}
            register={register}
            registerName={'cardNumber'}
            onChange={handleCardNumberChange}
          />
          {cardType && <p className={styles.cardType}>{cardType}</p>}

          <span role="alert" className={styles.errorMessage}>
            {errors.cardNumber?.message as string}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="CVC">{t('CVC')}</label>
          <InputText
            id="CVC"
            errors={!!errors.cvc?.message}
            placeholder={t('Enter CVC') as string}
            register={register}
            registerName={'cvc'}
          />
          <span role="alert" className={styles.errorMessage}>
            {errors.cvc?.message as string}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="cardName">{t('Card name')}</label>
          <InputText
            id="cardName"
            errors={!!errors.cardName?.message}
            placeholder={t('Enter card name') as string}
            register={register}
            registerName={'cardName'}
          />
          <span role="alert" className={styles.errorMessage}>
            {errors.cardName?.message as string}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="cardExpire">{t('Expire date')}</label>
          <InputText
            id="cardExpire"
            errors={!!errors.cardExpire?.message}
            placeholder="__/__"
            register={register}
            registerName="cardExpire"
          />
          <span role="alert" className={styles.errorMessage}>
            {errors.cardExpire?.message as string}
          </span>
        </div>
        <div className={styles.divider} />

        <Button
          text={t('Checkout')}
          type={'submit'}
          styleProps={styles.checkoutBtn}
          variant="rounded"
        />
      </div>
    </form>
  );
};
