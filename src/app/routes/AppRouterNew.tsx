import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@src/app/layout';
import { RoutePath } from '@shared/constants/routes';
import HomePage from '@src/pages/HomePage';

const LogInPage = lazy(() => import('@pages/LogInPage'));
const SignUpPage = lazy(() => import('@pages/SignUpPage'));
const CatalogPage = lazy(() => import('@pages/CatalogPage'));

const CartPage = lazy(() => import('@pages/CartPage'));
const FavouritesPage = lazy(() => import('@pages/FavouritesPage'));
const ItemPage = lazy(() => import('@pages/ItemPage'));
const ErrorPage = lazy(() => import('@pages/ErrorPage'));
const StoresPage = lazy(() => import('@pages/StoresPage'));
const Payment = lazy(() => import('@pages/CartPaymentPage'));
const MapsPage = lazy(() => import('@pages/MapsPage'));

export const router = createBrowserRouter([
  {
    path: RoutePath.HOME,
    element: (
      <>
        <Layout />
      </>
    ),
    children: [
      { path: RoutePath.HOME, element: <HomePage /> },
      {
        path: RoutePath.LOGIN,
        element: <LogInPage />,
      },
      {
        path: RoutePath.SIGNUP,
        element: <SignUpPage />,
      },
      {
        path: RoutePath.PAYMENT,
        element: <Payment />,
      },
      {
        path: RoutePath.MAPS,
        element: <MapsPage />,
      },
      {
        path: RoutePath.LIKES,
        element: <FavouritesPage />,
      },
      {
        path: RoutePath.STORES,
        element: <StoresPage />,
      },
      {
        path: RoutePath.CART,
        element: <CartPage />,
      },

      {
        path: RoutePath.ERROR,
        element: <ErrorPage />,
      },

      {
        path: RoutePath.CATALOG,
        element: <HomePage />,
      },

      {
        path: `/${RoutePath.CATALOG}/:category/:id`,
        element: <ItemPage />,
      },
      {
        path: `/${RoutePath.CATALOG}/:category`,
        element: <CatalogPage />,
      },

      {
        path: '/:id',
        element: <ItemPage />,
      },
    ],
  },
  {
    path: '*',
    element: <HomePage />,
  },
]);
