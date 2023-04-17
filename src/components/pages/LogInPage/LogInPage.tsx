import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@constants/routes';
import { IFormInput } from '@src/interfaces/IAuthFormInput';
import { AuthForm } from '@components/UI/AuthForm';
import styles from './LogInPage.module.scss';
// npx i18next-scanner
const LogInPage = () => {
  const { t } = useTranslation();

  const onLoginSubmit = async (input: IFormInput) => {
    const { email, password } = input;
    console.log(email, password);
  };

  return (
    <div className={styles.login}>
      <h3 className={styles.loginTitle}>{t('WELCOME BACK! LOG IN FOR MORE OPPORTUNITIES')}</h3>
      <AuthForm onSubmit={onLoginSubmit} buttonName={t('Sign in')} />
      <p className={styles.link}>
        {t('Not a member?')}
        <Link to={`/${RoutePath.SIGNUP}`} className={styles.linkSignUp}>
          {t('Join us')}
        </Link>
      </p>
    </div>
  );
};

export default LogInPage;
