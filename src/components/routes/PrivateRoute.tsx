import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '@constants/routes';
import { useAuth } from '@src/hooks/useAuth';
import { IRouteProps } from './Routes.interface';

export const PrivateRoute: FC<IRouteProps> = ({ children }) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to={`/${RoutePath.LOGIN}`} replace />;
  }

  return <>{children}</>;
};
