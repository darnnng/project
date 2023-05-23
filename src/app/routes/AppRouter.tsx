import React, { lazy } from 'react';
import { Routes, Route, Navigate, BrowserRouter, Outlet } from 'react-router-dom';
import { Layout } from '@src/app/layout';
import { RoutePath } from '@shared/constants/routes';
import { useAuth } from '@entities/user/model/useAuth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

const LogInPage = lazy(() => import('@pages/LogInPage'));
const SignUpPage = lazy(() => import('@pages/SignUpPage'));
const CatalogPage = lazy(() => import('@pages/CatalogPage'));
const HomePage = lazy(() => import('@pages/HomePage'));
const CartPage = lazy(() => import('@src/pages/CartPage'));
const FavouritesPage = lazy(() => import('@pages/FavouritesPage'));
const ItemPage = lazy(() => import('@pages/ItemPage'));
const ErrorPage = lazy(() => import('@pages/ErrorPage'));
const StoresPage = lazy(() => import('@pages/StoresPage'));
const Payment = lazy(() => import('@pages/CartPaymentPage'));
const MapsPage = lazy(() => import('@pages/MapsPage'));

export const AppRouter = () => {
  const isAuth = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.HOME} element={<Layout />}>
          <Route
            index
            element={
              isAuth ? (
                <Navigate to={`/${RoutePath.CATALOG}`} replace />
              ) : (
                <Navigate to={`/${RoutePath.LOGIN}`} replace />
              )
            }
          />
          <Route path="/" element={<Navigate to={RoutePath.CATALOG} replace />} />
          <Route
            path={RoutePath.LOGIN}
            element={
              <PublicRoute>
                <LogInPage />
              </PublicRoute>
            }
          />
          <Route
            path={RoutePath.SIGNUP}
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route path={RoutePath.CATALOG} element={<Outlet />}>
            <Route index element={<HomePage />} />
            <Route path=":category" element={<CatalogPage />} />
            <Route path=":category/:id" element={<ItemPage />} />
          </Route>

          <Route path={'/:id'} element={<ItemPage />}></Route>

          <Route
            path={RoutePath.CART}
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />

          <Route
            path={RoutePath.PAYMENT}
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />

          <Route path={RoutePath.MAPS} element={<MapsPage />} />

          <Route
            path={RoutePath.LIKES}
            element={
              <PrivateRoute>
                <FavouritesPage />
              </PrivateRoute>
            }
          />

          <Route path={RoutePath.STORES} element={<StoresPage />} />
          <Route path={RoutePath.ERROR} element={<ErrorPage />} />
        </Route>

        <Route
          path={RoutePath.GENERAL}
          element={<Navigate to={`/${RoutePath.CATALOG}`} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
