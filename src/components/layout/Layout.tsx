import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/header';

export const Layout = () => {
  return (
    <>
      <Suspense>
        <Header />
        <Outlet />
      </Suspense>
    </>
  );
};

//TO-DO ADD SPINNER <Suspense fallback={<Spinner />}>
//TO-DO ADD FOOTER
//TO-DO ADD ERROR BOUNDARY && NOTIFIER
