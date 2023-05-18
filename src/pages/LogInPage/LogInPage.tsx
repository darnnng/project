import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { RoutePath } from '@src/shared/constants/routes';
import { AuthForm } from '@src/features/Authorization';
import { setUser } from '@src/entities/user/model/userSlice';
import { auth } from '@src/shared/api/firebase';
import { useAppDispatch } from '@src/shared/model/reduxHooks';
import { IFormInput } from '@src/features/Authorization/model/types';
import { useHandleError } from '@src/shared/model/useHandleError';
import styles from './LogInPage.module.scss';

const LogInPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onError = useHandleError();

  const onLoginSubmit = (input: IFormInput) => {
    const { email, password } = input;
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          })
        );
        navigate(`/${RoutePath.CATALOG}`);
      })
      .catch((err) => onError(err.message));
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
