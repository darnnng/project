import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler } from 'react-hook-form';
import { RoutePath } from '@src/shared/constants/routes';
import { AuthForm } from '@src/features/Authorization';
import { setUser } from '@src/entities/user/model/userSlice';
import { auth } from '@src/shared/api/firebase';
import { useAppDispatch } from '@src/shared/model/reduxHooks';
import { IFormInput } from '@src/features/Authorization/model/types';
import { useHandleError } from '@src/shared/model/useHandleError';
import { withPublicRoute } from '@src/app/hocs/withPublicRoute';
import styles from './LogInPage.module.scss';

const LogInPage = () => {
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onError = useHandleError();

  const onLoginSubmit: SubmitHandler<IFormInput> = (input) => {
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
    <div data-testid="login-page" className={styles.login}>
      <h3 className={styles.loginTitle}>{t('welcomeback')}</h3>
      <AuthForm onSubmit={onLoginSubmit} buttonName={t('signin')} />
      <p className={styles.link}>
        {t('notMember')}
        <Link data-testid="signup-link" to={`/${RoutePath.SIGNUP}`} className={styles.linkSignUp}>
          {t('joinus')}
        </Link>
      </p>
    </div>
  );
};

export default withPublicRoute(LogInPage);
