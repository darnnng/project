import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputText } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { IPaymentInput } from '../model/PaymentForm.interface';
import styles from './PaymentForm.module.scss';

export const PaymentForm = () => {
  //   const { t } = useTranslation();
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<IPaymentInput>({
  //     mode: 'onSubmit',
  //     resolver: yupResolver(paymentSchema),
  //   });
  //   interface IPaymentInput {
  //     cardNumber: string;
  //     cvc: number;
  //     cardName: number;
  //     cardExpire: Date;
  //   }
  //   const onSubmit = () => {
  //     console.log('Order created');
  //   };
  //   return (
  //     <form onSubmit={handleSubmit(onSubmit)} noValidate>
  //       <div className={styles.formContainer}>
  //         <p className={styles.orderTitle}>{t('Your order')}</p>
  //         <div className={styles.inputContainer}>
  //           <label htmlFor="city">{t('City')}</label>
  //           <InputText
  //             id="cardNumber"
  //             errors={!!errors.cardNumber?.message}
  //             placeholder={t('Enter city') as string}
  //             register={register}
  //             registerName={'city'}
  //           />
  //           <span role="alert" className={styles.errorMessage}>
  //             {errors.city?.message as string}
  //           </span>
  //         </div>
  //         <div className={styles.inputContainer}>
  //           <label htmlFor="street">{t('Street')}</label>
  //           <InputText
  //             id="street"
  //             errors={!!errors.city?.message}
  //             placeholder={t('Enter street') as string}
  //             register={register}
  //             registerName={'street'}
  //           />
  //           <span role="alert" className={styles.errorMessage}>
  //             {errors.street?.message as string}
  //           </span>
  //         </div>
  //         <div className={styles.inputContainer}>
  //           <label htmlFor="house">{t('House number')}</label>
  //           <InputText
  //             id="house"
  //             errors={!!errors.house?.message}
  //             placeholder={t('Enter house number') as string}
  //             register={register}
  //             registerName={'house'}
  //           />
  //           <span role="alert" className={styles.errorMessage}>
  //             {errors.house?.message as string}
  //           </span>
  //         </div>
  //         <div className={styles.divider} />
  //         <div className={styles.divTotal}>
  //           <p className={styles.totalTitle}>
  //             Total: <b>{price}$</b>
  //           </p>
  //         </div>
  //         <Button
  //           text={t('Proceed to checkout')}
  //           type={'submit'}
  //           styleProps={styles.checkoutBtn}
  //           variant="rounded"
  //         />
  //       </div>
  //     </form>
  //  );
};
