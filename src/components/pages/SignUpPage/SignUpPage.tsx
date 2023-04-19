import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { RoutePath } from '@constants/routes';
import { IFormInput } from '@src/interfaces/IAuthFormInput';
import { AuthForm } from '@components/UI/AuthForm';
import styles from '@components/pages/LogInPage/LogInPage.module.scss';
import { auth } from '@src/firebase';
import { setUser } from '@src/redux/slices/userSlice';
import { useAppDispatch } from '@src/hooks/reduxHooks';

const SignUpPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSignUpSubmit = async (input: IFormInput) => {
    const { email, password } = input;
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          })
        );
        // addDoc(collection(db, `users`), {
        //   email: user.email,
        // });
        navigate(`/${RoutePath.CATALOG}`);
      })
      .catch((err) => console.log(err.message));
    //TO-DO ADD ERROR NOTIFICATION
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
