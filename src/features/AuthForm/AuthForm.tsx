import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from '@src/shared/lib/validation/validationSchema';
import { IFormInput } from '@src/features/AuthForm/IAuthFormInput';
import styles from './AuthForm.module.scss';
import { IAuthFormProps } from './AuthForm.interface';

export const AuthForm: FC<IAuthFormProps> = ({ onSubmit, buttonName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(authSchema),
  });

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.inputContainer}>
        <label htmlFor="email">{t('Email')}</label>
        <input
          id="email"
          className={!!errors.email?.message ? styles.formErrorInput : styles.formInput}
          placeholder={t('Enter email') as string}
          type="email"
          {...register('email')}
        />
        <span role="alert" className={styles.errorMessage}>
          {errors.email?.message as string}
        </span>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">{t('Password')}</label>
        <input
          id="password"
          className={!!errors.password?.message ? styles.formErrorInput : styles.formInput}
          placeholder={t('Enter password') as string}
          type="password"
          {...register('password')}
        />
        <span role="alert" className={styles.errorMessage}>
          {errors.password?.message as string}
        </span>
      </div>
      <p className={styles.formLabel}>
        {t('By authorizing, you agree to Threads & Co. Privacy Policy and Terms of use')}
      </p>
      <button type="submit">{buttonName}</button>
    </form>
  );
};
