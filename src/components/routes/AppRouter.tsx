import React, { lazy } from 'react';
import { Routes, Route, Navigate, BrowserRouter, Outlet } from 'react-router-dom';
import { RoutePath } from '@constants/routes';
import { Layout } from '@components/layout';
import { useAppSelector } from '@src/hooks/reduxHooks';
import { currentUser } from '@src/redux/slices/userSlice';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

const LogInPage = lazy(() => import('@components/pages/LogInPage'));
const SignUpPage = lazy(() => import('@components/pages/SignUpPage'));
const CatalogPage = lazy(() => import('@components/pages/CatalogPage'));
const HomePage = lazy(() => import('@components/pages/HomePage'));
const BasketPage = lazy(() => import('@components/pages/BasketPage'));
const ItemPage = lazy(() => import('@components/pages/ItemPage'));
const ErrorPage = lazy(() => import('@components/pages/ErrorPage'));
const StoresPage = lazy(() => import('@components/pages/StoresPage'));

export const AppRouter = () => {
  const { isAuth } = useAppSelector(currentUser);

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

          <Route
            path={RoutePath.BASKET}
            element={
              <PrivateRoute>
                <BasketPage />
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
