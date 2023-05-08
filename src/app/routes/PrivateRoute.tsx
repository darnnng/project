import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '@src/shared/constants/routes';
import { useAuth } from '@src/features/Authorization/model/useAuth';
import { IRouteProps } from './Routes.interface';

export const PrivateRoute: FC<IRouteProps> = ({ children }) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to={`/${RoutePath.LOGIN}`} replace />;
  }

  return <>{children}</>;
};
