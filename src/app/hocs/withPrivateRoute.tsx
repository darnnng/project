import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@src/shared/constants/routes';
import { useAuth } from '@src/entities/user/model/useAuth';

export const withPrivateRoute = (WrappedComponent: ComponentType) => () => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate(`/${RoutePath.LOGIN}`);
      return;
    }
  }, [isAuth, navigate]);

  return <WrappedComponent />;
};
