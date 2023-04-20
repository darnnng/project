import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { RoutePath } from '@constants/routes';
import { IFormInput } from '@src/interfaces/IAuthFormInput';
import { AuthForm } from '@components/UI/AuthForm';
import { setUser } from '@src/redux/slices/userSlice';
import { auth } from '@src/firebase';
import { useAppDispatch } from '@src/hooks/reduxHooks';
import { createAlert } from '@src/redux/slices/notifierSlice';
import styles from './LogInPage.module.scss';
// npx i18next-scanner
const LogInPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onError = (error: string) => {
    dispatch(
      createAlert({
        message: error,
      })
    );
  };

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
