import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { RoutePath } from '@src/shared/constants/routes';
import { AuthForm } from '@src/features/Authorization';
import styles from '@pages/LogInPage/LogInPage.module.scss';
import { auth } from '@src/shared/api/firebase';
import { setUser } from '@src/features/Authorization/model/userSlice';
import { useAppDispatch } from '@src/shared/model/reduxHooks';
import { createAlert } from '@src/shared/model/notifierSlice';
import { IFormInput } from '@src/features/Authorization/model/types';

const SignUpPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleError = (error: string) => {
    dispatch(
      createAlert({
        message: error,
      })
    );
  };

  const onSignUpSubmit = async (input: IFormInput) => {
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
      .catch((err) => handleError(err.message));
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
