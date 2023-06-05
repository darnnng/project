import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputText } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { IPaymentInput } from '../model/PaymentForm.interface';
import { paymentSchema } from '../lib/paymentSchema';
import styles from './PaymentForm.module.scss';

export const PaymentForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPaymentInput>({
    mode: 'onSubmit',
    resolver: yupResolver(paymentSchema),
  });

  const onSubmit = () => {
    console.log('Order created');
  };

  //TO-DO MOVE SPAN ALERT SOMEWHERE
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.formContainer}>
        <p className={styles.orderTitle}>{t('Your order')}</p>
        <div className={styles.inputContainer}>
          <label htmlFor="cardNumber">{t('Card number')}</label>
          <InputText
            id="cardNumber"
            errors={!!errors.cardNumber?.message}
            placeholder={t('Enter card number') as string}
            register={register}
            registerName={'cardNumber'}
          />
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
            placeholder={'__/__' as string}
            register={register}
            registerName={'cardExpire'}
          />
          <span role="alert" className={styles.errorMessage}>
            {errors.cardExpire?.message as string}
          </span>
        </div>
        <div className={styles.divider} />

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
