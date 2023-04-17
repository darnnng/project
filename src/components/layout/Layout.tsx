import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/header';
import { Footer } from '@components/footer';
import { Spinner } from '@components/UI/Spinner';

export const Layout = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Header />
        <Outlet />
        <Footer />
      </Suspense>
    </>
  );
};

//TO-DO ADD ERROR BOUNDARY && NOTIFIER
