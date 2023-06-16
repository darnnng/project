import React, { FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@src/shared/ui/Button';
import { InputText } from '@src/shared/ui/Input';
import { ValidationMessage } from '@src/shared/ui/ValidationMessage';
import { IAuthFormProps, IFormInput } from '../model/types';
import { authSchema } from '../lib/validationSchema';
import styles from './AuthForm.module.scss';

export const AuthForm: FC<IAuthFormProps> = memo(({ onSubmit, buttonName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(authSchema),
  });

  const { t } = useTranslation('auth');

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.inputContainer}>
        <label htmlFor="email">{t('Email')}</label>
        <InputText
          id="email"
          errors={!!errors.email?.message}
          placeholder={t('enterEmail') as string}
          type="email"
          register={register}
          registerName={'email'}
        />
        <ValidationMessage message={t(errors.email?.message as string)} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">{t('password')}</label>
        <InputText
          testid={'password-input'}
          id="password"
          errors={!!errors.email?.message}
          placeholder={t('enterPassword') as string}
          type="password"
          register={register}
          registerName={'password'}
        />
        <ValidationMessage testid={'alert1'} message={t(errors.password?.message as string)} />
      </div>
      <p className={styles.formLabel}>{t('termsuse')}</p>
      <Button type="submit" styleProps={styles.formButton} text={buttonName} />
    </form>
  );
});
