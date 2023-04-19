import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/header';
import { Footer } from '@components/footer';
import { Spinner } from '@components/UI/Spinner';
import { useAppSelector } from '@src/hooks/reduxHooks';
import { selectedTheme } from '@src/redux/slices/themeSlice';
import styles from './Layout.module.scss';

export const Layout = () => {
  const { themeLight } = useAppSelector(selectedTheme);
  return (
    <>
      <div className={`${styles.divContainer}  ${themeLight ? '' : styles.dark}`}>
        <Suspense fallback={<Spinner />}>
          <div className={styles.outletContainer}>
            <Header />
            <Outlet />
          </div>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

//TO-DO ADD ERROR BOUNDARY && NOTIFIER
