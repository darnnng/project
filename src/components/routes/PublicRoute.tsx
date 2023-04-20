import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '@constants/routes';
import { useAppSelector } from '@src/hooks/reduxHooks';
import { currentUser } from '@src/redux/slices/userSlice';
import { IRouteProps } from './Routes.interface';

export const PublicRoute: FC<IRouteProps> = ({ children }) => {
  const { isAuth } = useAppSelector(currentUser);

  if (isAuth) {
    return <Navigate to={`/${RoutePath.CATALOG}`} replace />;
  }

  return <>{children}</>;
};
