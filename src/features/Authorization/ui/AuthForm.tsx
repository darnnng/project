import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@src/shared/ui/Button';
import { InputText } from '@src/shared/ui/Input';
import { ValidationMessage } from '@src/shared/ui/ValidationMessage';
import { IAuthFormProps, IFormInput } from '../model/types';
import { authSchema } from '../lib/validationSchema';
import styles from './AuthForm.module.scss';

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
        <InputText
          id="email"
          errors={!!errors.email?.message}
          placeholder={t('Enter email') as string}
          type="email"
          register={register}
          registerName={'email'}
        />
        <ValidationMessage data-testid="alert1" message={t(errors.email?.message as string)} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">{t('Password')}</label>
        <InputText
          id="password"
          errors={!!errors.email?.message}
          placeholder={t('Enter password') as string}
          type="password"
          register={register}
          registerName={'password'}
        />
        <ValidationMessage data-testid="alert2" message={t(errors.password?.message as string)} />
      </div>
      <p className={styles.formLabel}>
        {t('By authorizing, you agree to Threads & Co. Privacy Policy and Terms of use')}
      </p>
      <Button
        data-testid="submitBtn"
        type="submit"
        styleProps={styles.formButton}
        text={buttonName}
      />
    </form>
  );
};
