import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '@constants/routes';
import { IRouteProps } from './Routes.interface';

export const PublicRoute: FC<IRouteProps> = ({ children }) => {
  const isAuth = false; //TO-DO CHANGE

  if (isAuth) {
    return <Navigate to={`/${RoutePath.CATALOG}`} replace />;
  }

  return <>{children}</>;
};
