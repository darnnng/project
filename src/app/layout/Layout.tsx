import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@shared/ui/Spinner';
import { useAppSelector } from '@shared/model/reduxHooks';
import { selectedTheme } from '@features/ThemeChange/model/themeSlice';
import { Notifier } from '@shared/ui/Notifier';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import { ErrorBoundary } from '../errorBoundary';
import styles from './Layout.module.scss';

export const Layout = () => {
  const { themeLight } = useAppSelector(selectedTheme);
  return (
    <>
      <div className={`${styles.divContainer}  ${themeLight ? '' : styles.dark}`}>
        <Suspense fallback={<Spinner />}>
          <div className={styles.outletContainer}>
            <Header />
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
          <Footer />
        </Suspense>
        <Notifier />
      </div>
    </>
  );
};
