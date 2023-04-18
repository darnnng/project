import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@constants/routes';
import { IFormInput } from '@src/interfaces/IAuthFormInput';
import { AuthForm } from '@components/UI/AuthForm';
import styles from '@components/pages/LogInPage/LogInPage.module.scss';

const SignUpPage = () => {
  const { t } = useTranslation();

  const onSignUpSubmit = async (input: IFormInput) => {
    const { email, password } = input;
    console.log(email, password);
  };

  return (
    <div className={styles.login}>
      <h3 className={styles.loginTitle}>{t('WELCOME! SIGN UP FOR MORE OPPORTUNITIES')}</h3>
      <AuthForm onSubmit={onSignUpSubmit} buttonName={t('Sign up')} />
      <p className={styles.link}>
        {t('Already have an account?')}
        <Link to={`/${RoutePath.LOGIN}`} className={styles.linkSignUp}>
          {t('Follow link')}
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
