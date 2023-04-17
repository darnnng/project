import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { RoutePath } from '@constants/routes';
import { authSchema } from '@components/utils/validationSchema';
import styles from './LogInPage.module.scss';
import { IFormInput } from './LogIn.interface';

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(authSchema),
  });

  const { t } = useTranslation();

  const onSubmit = async (input: IFormInput) => {
    const { email, password } = input;
    console.log(email, password);
  };

  return (
    <div className={styles.login}>
      <h3 className={styles.loginTitle}>WELCOME BACK! LOG IN FOR MORE OPPORTUNITIES</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className={styles.formInput}
          placeholder={t('Enter email') as string}
          type="email"
          {...register('email')}
          // helperText={t(errors.email?.message as string)}
          // error={!!errors.email?.message}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className={styles.formInput}
          placeholder={t('Enter password') as string}
          type="password"
          {...register('password')}
        />
        <p className={styles.formLabel}>
          By authorizing, you agree to Threads & Co. Privacy Policy and Terms of use
        </p>
        <button type="submit"> Sign in </button>
      </form>
      <p className={styles.link}>
        Not a member?{' '}
        <Link to={`/${RoutePath.SIGNUP}`} className={styles.linkSignUp}>
          Join us
        </Link>
      </p>
    </div>
  );
};

export default LogInPage;
