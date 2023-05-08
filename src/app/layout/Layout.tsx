import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@src/widgets/header';
import { Footer } from '@src/widgets/footer';
import { Spinner } from '@src/shared/ui/Spinner';
import { useAppSelector } from '@src/shared/model/reduxHooks';
import { selectedTheme } from '@src/features/ThemeChange/model/themeSlice';
import { Notifier } from '@src/shared/ui/Notifier';
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
