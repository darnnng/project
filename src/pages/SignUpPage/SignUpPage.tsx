import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import { RoutePath } from '@shared/constants/routes';
import { AuthForm } from '@features/Authorization';
import styles from '@pages/LogInPage/LogInPage.module.scss';
import { auth } from '@shared/api/firebase';
import { setUser } from '@entities/user/model/userSlice';
import { useAppDispatch } from '@shared/model/reduxHooks';
import { IFormInput } from '@features/Authorization/model/types';
import { useHandleError } from '@src/shared/model/useHandleError';

const SignUpPage = () => {
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleError = useHandleError();

  const onSignUpSubmit: SubmitHandler<IFormInput> = async (input) => {
    const { email, password } = input;
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          })
        );
        navigate(`/${RoutePath.CATALOG}`);
      })
      .catch((err) => handleError(err));
  };

  return (
    <div className={styles.login}>
      <h3 className={styles.loginTitle}>{t('welcome')}</h3>
      <AuthForm onSubmit={onSignUpSubmit} buttonName={t('signup')} />
      <p className={styles.link}>
        {t('alreadyAccount')}
        <Link data-testid="login-link" to={`/${RoutePath.LOGIN}`} className={styles.linkSignUp}>
          {t('followLink')}
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
