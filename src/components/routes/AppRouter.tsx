import React, { lazy } from 'react';
import { Routes, Route, Navigate, BrowserRouter, Outlet } from 'react-router-dom';
import { RoutePath } from '@constants/routes';
import { Layout } from '@components/layout';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

const LogInPage = lazy(() => import('@components/pages/LogInPage'));
const SignUpPage = lazy(() => import('@components/pages/SignUpPage'));
const CatalogPage = lazy(() => import('@components/pages/CatalogPage'));
const BasketPage = lazy(() => import('@components/pages/BasketPage'));
const ItemPage = lazy(() => import('@components/pages/ItemPage'));
const ErrorPage = lazy(() => import('@components/pages/ErrorPage'));

export const AppRouter = () => {
  //   const isAuth = useAuth(); TO-DO CHANGE
  //TO-DO ADD ERROR PAGE
  const isAuth = false;

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
            <Route index element={<CatalogPage />} />
            <Route path=":id" element={<ItemPage />} />
          </Route>

          <Route
            path={RoutePath.BASKET}
            element={
              <PrivateRoute>
                <BasketPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path={RoutePath.ERROR} element={<ErrorPage />} />
        {/* <Route path={RoutePath.ERROR} element={<ErrorPage pageNotFound />} /> */}
        <Route
          path={RoutePath.GENERAL}
          element={<Navigate to={`/${RoutePath.CATALOG}`} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
