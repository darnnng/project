import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/header';
import { Footer } from '@components/footer';
import { Spinner } from '@components/UI/Spinner';

export const Layout = () => {
  return (
    <>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Suspense fallback={<Spinner />}>
          <div style={{ paddingBottom: '2.5rem' }}>
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
